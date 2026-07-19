// Shared visual primitive used by Notes & AI Tools.
// A tactile, paper-like "document" mark — replaces lucide Folder/BookOpen
// wherever a file or note is represented. Tinted per course/tool.

import { type ReactNode } from "react";

export type TileTone = "amber" | "blue" | "emerald" | "violet" | "coral" | "slate";

const TONE: Record<TileTone, { band: string; sheet: string; ink: string; shadow: string; accent: string }> = {
  amber:   { band: "#f59e0b", sheet: "#fffdf6", ink: "#92400e", shadow: "rgba(245,158,11,.22)", accent: "#fbbf24" },
  blue:    { band: "#2563eb", sheet: "#f7faff", ink: "#1e3a8a", shadow: "rgba(37,99,235,.22)",  accent: "#60a5fa" },
  emerald: { band: "#059669", sheet: "#f5fdf9", ink: "#064e3b", shadow: "rgba(5,150,105,.22)",  accent: "#34d399" },
  violet:  { band: "#7c3aed", sheet: "#faf7ff", ink: "#4c1d95", shadow: "rgba(124,58,237,.22)", accent: "#a78bfa" },
  coral:   { band: "#f43f5e", sheet: "#fff7f8", ink: "#9f1239", shadow: "rgba(244,63,94,.22)",  accent: "#fb7185" },
  slate:   { band: "#475569", sheet: "#f8fafc", ink: "#1e293b", shadow: "rgba(71,85,105,.22)",  accent: "#94a3b8" },
};

interface DocumentTileProps {
  tone?: TileTone;
  size?: number;            // square px
  label?: string;           // tiny badge in folded corner (e.g. "PDF", "MD")
  glyph?: ReactNode;        // optional center glyph (lucide icon, etc.)
  lines?: number;           // ruled lines drawn on sheet (default 3)
  className?: string;
}

/**
 * A miniature paper sheet with a colored top band, folded top-right corner,
 * ruled lines, and an optional glyph or label. Designed to read as a real
 * document at any size from 28px (inline) up to 96px (hero).
 */
export function DocumentTile({
  tone = "slate",
  size = 56,
  label,
  glyph,
  lines = 3,
  className,
}: DocumentTileProps) {
  const c = TONE[tone];
  const w = size;
  const h = Math.round(size * 1.25); // 4:5 paper ratio
  const fold = Math.max(10, Math.round(size * 0.22));

  return (
    <div
      className={className}
      style={{
        width: w,
        height: h,
        filter: `drop-shadow(0 10px 18px ${c.shadow})`,
        flexShrink: 0,
      }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
        <defs>
          <linearGradient id={`sheet-${tone}-${size}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={c.sheet} />
          </linearGradient>
          <linearGradient id={`band-${tone}-${size}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.band} />
            <stop offset="100%" stopColor={c.accent} />
          </linearGradient>
        </defs>

        {/* paper body with folded corner cut out */}
        <path
          d={`M2,2 H${w - fold} L${w - 2},${fold} V${h - 2} H2 Z`}
          fill={`url(#sheet-${tone}-${size})`}
          stroke="rgba(15,23,42,.08)"
          strokeWidth="1"
        />

        {/* folded corner triangle */}
        <path
          d={`M${w - fold},2 L${w - 2},${fold} L${w - fold},${fold} Z`}
          fill={c.accent}
          opacity="0.85"
        />
        <path
          d={`M${w - fold},2 L${w - fold},${fold} L${w - 2},${fold}`}
          fill="none"
          stroke="rgba(15,23,42,.18)"
          strokeWidth="1"
        />

        {/* top color band */}
        <rect
          x="2"
          y="2"
          width={w - fold - 2}
          height={Math.max(4, size * 0.08)}
          fill={`url(#band-${tone}-${size})`}
        />

        {/* ruled lines */}
        {Array.from({ length: lines }).map((_, i) => {
          const y = fold + 14 + i * Math.max(7, size * 0.13);
          if (y > h - 10) return null;
          return (
            <rect
              key={i}
              x={size * 0.18}
              y={y}
              width={w - size * 0.36}
              height={Math.max(2, size * 0.045)}
              rx={1.5}
              fill={c.band}
              opacity={0.18 - i * 0.04}
            />
          );
        })}
      </svg>

      {/* optional center glyph overlay */}
      {glyph && (
        <div
          style={{
            position: "relative",
            marginTop: -h + fold + Math.max(8, size * 0.08),
            height: h - fold - Math.max(8, size * 0.08),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.ink,
            pointerEvents: "none",
          }}
        >
          {glyph}
        </div>
      )}

      {/* optional label in the folded corner */}
      {label && (
        <div
          style={{
            position: "relative",
            marginTop: -h + 4,
            width: w,
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 4,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: Math.max(7, size * 0.14),
              fontWeight: 800,
              letterSpacing: 0.4,
              color: "#fff",
              background: c.band,
              padding: "1px 5px",
              borderRadius: 4,
              lineHeight: 1,
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

export const courseTone = (course: string): TileTone => {
  const k = course.toLowerCase();
  if (k.includes("chem")) return "amber";
  if (k.includes("econ")) return "blue";
  if (k.includes("bio")) return "emerald";
  if (k.includes("math") || k.includes("phys")) return "violet";
  return "slate";
};
