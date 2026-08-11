import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDeviceId } from "@/lib/device";
import type { ToolType } from "@/types";

export const dynamic = "force-dynamic";

interface FavoriteBody {
  toolSlug: string;
  toolType: ToolType;
}

function isValidBody(body: unknown): body is FavoriteBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.toolSlug === "string" &&
    b.toolSlug.length > 0 &&
    (b.toolType === "calculator" || b.toolType === "converter")
  );
}

export async function GET() {
  if (!prisma) return NextResponse.json({ favorites: [], offline: true });

  const deviceId = await getOrCreateDeviceId();
  const favorites = await prisma.favorite.findMany({
    where: { deviceId },
    select: { toolSlug: true, toolType: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ favorites, offline: false });
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
  await prisma.favorite.upsert({
    where: {
      deviceId_toolSlug_toolType: { deviceId, toolSlug: body.toolSlug, toolType: body.toolType },
    },
    create: { deviceId, toolSlug: body.toolSlug, toolType: body.toolType },
    update: {},
  });

  return NextResponse.json({ ok: true, offline: false });
}

export async function DELETE(request: Request) {
  if (!prisma) return NextResponse.json({ ok: true, offline: true });

  const { searchParams } = new URL(request.url);
  const toolSlug = searchParams.get("toolSlug");
  const toolType = searchParams.get("toolType");
  if (!toolSlug || (toolType !== "calculator" && toolType !== "converter")) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  const deviceId = await getOrCreateDeviceId();
  await prisma.favorite
    .delete({
      where: { deviceId_toolSlug_toolType: { deviceId, toolSlug, toolType } },
    })
    .catch(() => null);

  return NextResponse.json({ ok: true, offline: false });
}
