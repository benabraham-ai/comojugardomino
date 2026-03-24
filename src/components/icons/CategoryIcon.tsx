/**
 * Category icons for blog filter UI.
 * Designed by Luna — Dark Earth V5.2 palette.
 * Uses currentColor pattern for active/inactive states.
 */

import React from "react";

export type CategoryIconName =
  | "todos"
  | "reglas"
  | "estrategia"
  | "cultura"
  | "psicologia"
  | "variantes";

interface CategoryIconProps {
  name: CategoryIconName;
  active?: boolean;
  size?: number;
  className?: string;
}

const ICON_PATHS: Record<CategoryIconName, React.ReactNode> = {
  // Todos: 5-dot grid + crosshair
  todos: (
    <>
      <circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <line x1="10" y1="3" x2="10" y2="17" />
      <line x1="3" y1="10" x2="17" y2="10" />
    </>
  ),

  // Reglas: Document with checkmarks
  reglas: (
    <>
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <polyline points="6,7 7.5,8.5 10,6" />
      <line x1="11.5" y1="7" x2="14" y2="7" />
      <polyline points="6,11 7.5,12.5 10,10" />
      <line x1="11.5" y1="11" x2="14" y2="11" />
      <polyline points="6,15 7.5,16.5 10,14" />
      <line x1="11.5" y1="15" x2="14" y2="15" />
    </>
  ),

  // Estrategia: Crosshair / target
  estrategia: (
    <>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3" />
      <line x1="10" y1="2" x2="10" y2="6" />
      <line x1="10" y1="14" x2="10" y2="18" />
      <line x1="2" y1="10" x2="6" y2="10" />
      <line x1="14" y1="10" x2="18" y2="10" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </>
  ),

  // Cultura: Globe with meridians
  cultura: (
    <>
      <circle cx="10" cy="10" r="8" />
      <path d="M10 2 C13 5 13 15 10 18" />
      <path d="M10 2 C7 5 7 15 10 18" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <path d="M3.5 6.5 C6 5 14 5 16.5 6.5" />
      <path d="M3.5 13.5 C6 15 14 15 16.5 13.5" />
    </>
  ),

  // Psicología: Head with thought sparks
  psicologia: (
    <>
      <path d="M6 17 L6 14 C4 13 3 11 3 9 C3 5.5 6 3 10 3 C14 3 17 5.5 17 9 C17 11 16 13 14 14 L14 17" />
      <line x1="6" y1="17" x2="14" y2="17" />
      <line x1="10" y1="7" x2="10" y2="5" />
      <line x1="12.5" y1="7.5" x2="13.5" y2="6" />
      <line x1="7.5" y1="7.5" x2="6.5" y2="6" />
    </>
  ),

  // Variantes: Branching path (3 forks)
  variantes: (
    <>
      <line x1="10" y1="17" x2="10" y2="11" />
      <path d="M10 11 C10 8 5 8 5 5" />
      <line x1="10" y1="11" x2="10" y2="5" />
      <path d="M10 11 C10 8 15 8 15 5" />
      <circle cx="5" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
};

export function CategoryIcon({
  name,
  active = false,
  size = 20,
  className = "",
}: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: active ? "#E8572A" : "#9E9181" }}
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
