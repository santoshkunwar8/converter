"use client";

import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/copy-button";
import { ShareButton } from "@/components/shared/share-button";
import { PrintButton } from "@/components/shared/print-button";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { useRecent } from "@/hooks/use-recent";
import { SITE_URL } from "@/lib/constants";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function normalizeHex(input: string): string | null {
  let hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return `#${hex.toLowerCase()}`;
}

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      break;
    case gn:
      h = ((bn - rn) / d + 2) / 6;
      break;
    default:
      h = ((rn - gn) / d + 4) / 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const DEFAULT_COLOR = "#6366f1";

export function ColorConverterView({ slug }: { slug: string }) {
  const [hexInput, setHexInput] = useState(DEFAULT_COLOR);
  const { addRecent } = useRecent();

  useEffect(() => {
    addRecent(slug, "converter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const normalized = normalizeHex(hexInput);
  const rgb = useMemo(() => (normalized ? hexToRgb(normalized) : null), [normalized]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);

  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : null;
  const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : null;
  const shareUrl = `${SITE_URL}/converters/${slug}`;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <div
              className="size-28 shrink-0 rounded-2xl border border-border shadow-soft"
              style={{ backgroundColor: normalized ?? undefined }}
              aria-hidden="true"
            />
            <input
              type="color"
              value={normalized ?? DEFAULT_COLOR}
              onChange={(e) => setHexInput(e.target.value)}
              className="h-9 w-28 cursor-pointer rounded-lg border border-input bg-transparent"
              aria-label="Pick a color"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hex-input">Hex color</Label>
            <Input
              id="hex-input"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder="#6366f1"
              className="h-11 font-mono text-base"
              aria-invalid={!normalized}
            />
            {!normalized && (
              <p className="text-xs font-medium text-destructive">
                Enter a valid hex color (e.g. #6366f1 or #fff).
              </p>
            )}

            {rgb && hsl && (
              <div className="mt-4 space-y-3">
                <ValueRow label="HEX" value={normalized!} />
                <ValueRow label="RGB" value={rgbString!} />
                <ValueRow label="HSL" value={hslString!} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" data-no-print="true">
          {normalized && <CopyButton value={normalized} label="Copy HEX" />}
          <ShareButton title="Color conversion" url={shareUrl} />
          <PrintButton />
          <FavoriteButton toolSlug={slug} toolType="converter" variant="full" />
        </div>
      </div>
    </div>
  );
}

function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <code className="font-mono text-sm">{value}</code>
        <CopyButton value={value} label="" className="h-6 w-6 justify-center p-0" />
      </div>
    </div>
  );
}
