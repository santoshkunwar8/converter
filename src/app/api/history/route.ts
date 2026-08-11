import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDeviceId } from "@/lib/device";
import { MAX_HISTORY_ENTRIES } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface HistoryBody {
  converterSlug: string;
  fromUnit: string;
  toUnit: string;
  inputValue: number;
  outputValue: number;
}

function isValidBody(body: unknown): body is HistoryBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.converterSlug === "string" &&
    b.converterSlug.length > 0 &&
    typeof b.fromUnit === "string" &&
    typeof b.toUnit === "string" &&
    typeof b.inputValue === "number" &&
    typeof b.outputValue === "number"
  );
}

export async function GET(request: Request) {
  if (!prisma) return NextResponse.json({ history: [], offline: true });

  const { searchParams } = new URL(request.url);
  const converterSlug = searchParams.get("converterSlug");
  if (!converterSlug) {
    return NextResponse.json({ error: "converterSlug is required" }, { status: 400 });
  }

  const deviceId = await getOrCreateDeviceId();
  const history = await prisma.conversionHistory.findMany({
    where: { deviceId, converterSlug },
    orderBy: { createdAt: "desc" },
    take: MAX_HISTORY_ENTRIES,
  });
  return NextResponse.json({ history, offline: false });
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
  await prisma.conversionHistory.create({ data: { deviceId, ...body } });

  const excess = await prisma.conversionHistory.findMany({
    where: { deviceId, converterSlug: body.converterSlug },
    orderBy: { createdAt: "desc" },
    skip: MAX_HISTORY_ENTRIES,
    select: { id: true },
  });
  if (excess.length > 0) {
    await prisma.conversionHistory.deleteMany({
      where: { id: { in: excess.map((e) => e.id) } },
    });
  }

  return NextResponse.json({ ok: true, offline: false });
}
