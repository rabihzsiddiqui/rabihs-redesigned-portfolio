// components/ui/Panel.tsx
// Reusable dark translucent card panel with consistent border and radius.

import { type ReactNode, type CSSProperties, type ElementType } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export default function Panel({
  children,
  className = "",
  style,
  as: Tag = "div",
}: PanelProps) {
  return (
    <Tag
      className={className}
      style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--panel-radius)",
        padding: "var(--panel-padding)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
