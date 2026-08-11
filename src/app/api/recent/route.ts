import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDeviceId } from "@/lib/device";
import { MAX_RECENT_TOOLS } from "@/lib/constants";
import type { ToolType } from "@/types";

export const dynamic = "force-dynamic";

interface RecentBody {
  toolSlug: string;
  toolType: ToolType;
}

function isValidBody(body: unknown): body is RecentBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.toolSlug === "string" &&
    b.toolSlug.length > 0 &&
    (b.toolType === "calculator" || b.toolType === "converter")
  );
}

export async function GET() {
  if (!prisma) return NextResponse.json({ recent: [], offline: true });

  const deviceId = await getOrCreateDeviceId();
  const recent = await prisma.recentTool.findMany({
    where: { deviceId },
    select: { toolSlug: true, toolType: true, visitedAt: true },
    orderBy: { visitedAt: "desc" },
    take: MAX_RECENT_TOOLS,
  });
  return NextResponse.json({ recent, offline: false });
}

export async function POST(request: Request) {
  if (!prisma) return NextResponse.json({ ok: true, offline: true });

  const body = await request.json().catch(() => null);
  if (!isValidBody(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const deviceId = await getOrCreateDeviceId();
  await prisma.device.upsert({
    where: { id: deviceId },
    create: { id: deviceId },
    update: {},
  });
  await prisma.recentTool.upsert({
    where: {
      deviceId_toolSlug_toolType: { deviceId, toolSlug: body.toolSlug, toolType: body.toolType },
    },
    create: { deviceId, toolSlug: body.toolSlug, toolType: body.toolType },
    update: { visitedAt: new Date() },
  });

  return NextResponse.json({ ok: true, offline: false });
}
