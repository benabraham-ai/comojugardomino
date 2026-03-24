/**
 * DominoIcon — Unified icon component for Como Jugar Domino
 * 
 * Uses Phosphor Icons for generic UI icons
 * Uses custom SVG symbols for domino-specific icons
 */

"use client";

import React from "react";
import {
  Play,
  BookOpen,
  DownloadSimple,
  List,
  X,
  CaretRight,
  CaretLeft,
  CaretUp,
  CaretDown,
  House,
  GearSix,
  UserCircle,
  MagnifyingGlass,
  ShareNetwork,
  ArrowLeft,
  UsersThree,
  Trophy,
  Timer,
  XCircle,
  Star,
  BookBookmark,
  Brain,
  Scroll,
  Robot,
  Users,
  Medal,
  ChartBar,
  PencilSimple,
  ArrowCounterClockwise,
  ChatCircle,
  ProhibitInset,
  Crosshair,
  GameController,
  DeviceMobile,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";

// ============================================================
// Types
// ============================================================

type IconSize = "sm" | "md" | "lg" | "xl" | "2xl" | number;

interface DominoIconProps {
  name: string;
  size?: IconSize;
  color?: string;
  weight?: IconWeight;
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================
// Size System
// ============================================================

const SIZE_MAP: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  "2xl": 64,
};

function resolveSize(size: IconSize): number {
  if (typeof size === "number") return size;
  return SIZE_MAP[size] ?? 24;
}

// ============================================================
// Phosphor Icon Mapping
// ============================================================

const PHOSPHOR_ICONS: Record<string, PhosphorIcon> = {
  // Navigation
  "nav-play": Play,
  "nav-learn": BookOpen,
  "nav-download": DownloadSimple,
  "nav-menu": List,
  "nav-close": X,
  "nav-arrow-right": CaretRight,
  "nav-arrow-left": CaretLeft,
  "nav-arrow-up": CaretUp,
  "nav-arrow-down": CaretDown,
  "nav-home": House,
  "nav-settings": GearSix,
  "nav-profile": UserCircle,
  "nav-search": MagnifyingGlass,
  "nav-share": ShareNetwork,
  "nav-back": ArrowLeft,

  // Game elements (generic)
  "game-partnership": UsersThree,
  "game-score": Trophy,
  "game-timer": Timer,
  "game-win": Star,
  "game-lose": XCircle,
  "game-chat": ChatCircle,
  "game-pass": ProhibitInset,
  "game-target": Crosshair,
  "game-controller": GameController,

  // Features
  "feature-lessons": BookBookmark,
  "feature-strategy": Brain,
  "feature-rules": Scroll,
  "feature-bots": Robot,
  "feature-multiplayer": Users,
  "feature-tournaments": Medal,
  "feature-leaderboard": ChartBar,
  "feature-practice": PencilSimple,
  "feature-replay": ArrowCounterClockwise,
  "feature-app": DeviceMobile,
};

// ============================================================
// Custom SVG Icons (domino-specific)
// ============================================================

function CustomDominoTile({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color }}>
      <rect x="5" y="2" width="14" height="20" rx="3" fill="currentColor" opacity={0.15} />
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Domino Live Logo Icon — [1|1] diagonal domino tile
 * Spec: -35° rotation, two pips, NO divider line, dark on light backgrounds
 */
function CustomDominoLiveLogo({ size, color }: { size: number; color: string }) {
  // Scale from 56x56 viewBox to requested size
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" style={{ color }}>
      <g transform="rotate(-35 28 28)">
        <rect x="16" y="8" width="24" height="44" rx="4" fill="currentColor" />
        {/* Top pip */}
        <circle cx="28" cy="18" r="3.5" fill="#1a1a1a" />
        {/* Bottom pip */}
        <circle cx="28" cy="38" r="3.5" fill="#1a1a1a" />
      </g>
    </svg>
  );
}



function CustomBoneyard({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color }}>
      <rect x="7" y="3" width="10" height="14" rx="2" fill="currentColor" opacity={0.08} stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="5" width="10" height="14" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="7" width="10" height="14" rx="2" fill="currentColor" opacity={0.18} stroke="currentColor" strokeWidth="2" />
      <circle cx="6.5" cy="11" r="1" fill="currentColor" />
      <circle cx="9.5" cy="14" r="1" fill="currentColor" />
      <line x1="3" y1="14" x2="13" y2="14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function CustomDominoDouble({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color }}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity={0.15} />
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="17" cy="7" r="1.5" fill="currentColor" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CustomGameHand({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color }}>
      <g transform="rotate(-20, 12, 20)">
        <rect x="4" y="6" width="7" height="12" rx="1.5" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1.5" />
      </g>
      <g transform="rotate(-8, 12, 20)">
        <rect x="8.5" y="5" width="7" height="12" rx="1.5" fill="currentColor" opacity={0.15} stroke="currentColor" strokeWidth="1.5" />
      </g>
      <rect x="8.5" y="4" width="7" height="12" rx="1.5" fill="currentColor" opacity={0.18} stroke="currentColor" strokeWidth="2" />
      <line x1="8.5" y1="10" x2="15.5" y2="10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <g transform="rotate(8, 12, 20)">
        <rect x="8.5" y="5" width="7" height="12" rx="1.5" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1.5" />
      </g>
      <g transform="rotate(20, 12, 20)">
        <rect x="13" y="6" width="7" height="12" rx="1.5" fill="currentColor" opacity={0.08} stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// ============================================================
// Custom Icon Registry
// ============================================================

const CUSTOM_ICONS: Record<string, (size: number, color: string) => React.ReactElement> = {
  "game-domino-tile": (s, c) => <CustomDominoTile size={s} color={c} />,
  "game-domino-double": (s, c) => <CustomDominoDouble size={s} color={c} />,
  "game-boneyard": (s, c) => <CustomBoneyard size={s} color={c} />,
  "game-hand": (s, c) => <CustomGameHand size={s} color={c} />,
  "domino-live-logo": (s, c) => <CustomDominoLiveLogo size={s} color={c} />,
};

// ============================================================
// Default colors per difficulty
// ============================================================

export const DIFFICULTY_COLORS = {
  easy: "#10b981",    // Green — Fácil
  medium: "#ff6b35",  // Orange — Intermedio  
  hard: "#ef4444",    // Red — Avanzado
  expert: "#f7c948",  // Gold — Experto
};

// ============================================================
// Main Component
// ============================================================

export function DominoIcon({
  name,
  size = "md",
  color = "currentColor",
  weight = "duotone",
  className,
  style,
}: DominoIconProps) {
  const resolvedSize = resolveSize(size);

  // Check custom icons first
  if (CUSTOM_ICONS[name]) {
    const element = CUSTOM_ICONS[name](resolvedSize, color);
    if (className || style) {
      return React.cloneElement(element, { className, style: { ...element.props.style, ...style } });
    }
    return element;
  }

  // Fall back to Phosphor
  const PhosphorComponent = PHOSPHOR_ICONS[name];
  if (PhosphorComponent) {
    return (
      <PhosphorComponent
        size={resolvedSize}
        color={color}
        weight={weight}
        className={className}
        style={style}
      />
    );
  }

  // Fallback: empty placeholder
  if (process.env.NODE_ENV === "development") {
    console.warn(`DominoIcon: unknown icon "${name}"`);
  }
  return <span style={{ display: "inline-block", width: resolvedSize, height: resolvedSize }} />;
}

// ============================================================
// Convenience exports
// ============================================================

/** All registered icon names */
export const ALL_ICON_NAMES = [
  ...Object.keys(PHOSPHOR_ICONS),
  ...Object.keys(CUSTOM_ICONS),
].sort();

export default DominoIcon;
