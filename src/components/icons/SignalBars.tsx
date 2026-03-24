/**
 * SignalBars — Difficulty indicator using ascending signal bars
 * 
 * 4 vertical bars with increasing heights (left to right)
 * Filled bars: solid color with matching border
 * Empty bars: transparent with faded border (30% opacity)
 * 
 * V5.2 Dark Earth palette colors:
 * - Level 1: Olive (easy)
 * - Level 2: Khaki (intermediate)
 * - Level 3: Terracotta (advanced)
 * - Level 4: Gold (expert)
 */

"use client";

import React from "react";

// ============================================================
// Types
// ============================================================

type SignalLevel = 1 | 2 | 3 | 4;
type SignalSize = "sm" | "md" | "lg";

interface SignalBarsProps {
  level: SignalLevel;
  size?: SignalSize;
  className?: string;
}

// ============================================================
// V5.2 Color System — Earth Tones
// ============================================================

export const SIGNAL_COLORS: Record<SignalLevel, string> = {
  1: "#7FC145", // Live Green — Fácil
  2: "#B5A07A", // Khaki — Intermedio
  3: "#FF6B35", // Brand Orange — Avanzado
  4: "#F7C948", // Brand Gold — Experto
};

// ============================================================
// Size System
// ============================================================

// Base dimensions at "md" size
const BASE_BAR_WIDTH = 6;
const BASE_GAP = 3;
const BASE_HEIGHTS = [8, 14, 20, 28];
const BASE_BORDER_RADIUS = 2;

const SIZE_SCALES: Record<SignalSize, number> = {
  sm: 0.75,
  md: 1,
  lg: 1.5,
};

// ============================================================
// Component
// ============================================================

export function SignalBars({ level, size = "md", className }: SignalBarsProps) {
  const scale = SIZE_SCALES[size];
  const barWidth = BASE_BAR_WIDTH * scale;
  const gap = BASE_GAP * scale;
  const heights = BASE_HEIGHTS.map((h) => h * scale);
  const borderRadius = BASE_BORDER_RADIUS * scale;
  const color = SIGNAL_COLORS[level];

  // Calculate SVG dimensions
  const totalWidth = barWidth * 4 + gap * 3;
  const maxHeight = heights[3]; // tallest bar

  return (
    <svg
      width={totalWidth}
      height={maxHeight}
      viewBox={`0 0 ${totalWidth} ${maxHeight}`}
      fill="none"
      className={className}
      aria-label={`Difficulty level ${level} of 4`}
    >
      {heights.map((barHeight, index) => {
        const barIndex = index + 1; // 1-based for level comparison
        const isFilled = barIndex <= level;
        const x = index * (barWidth + gap);
        const y = maxHeight - barHeight;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={borderRadius}
            ry={borderRadius}
            fill={isFilled ? color : "transparent"}
            stroke={color}
            strokeWidth={1.5}
            strokeOpacity={isFilled ? 1 : 0.3}
          />
        );
      })}
    </svg>
  );
}

export default SignalBars;
