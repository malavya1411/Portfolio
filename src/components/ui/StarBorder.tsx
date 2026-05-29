"use client";

import React from "react";
import "./StarBorder.css";

interface StarBorderProps extends React.HTMLAttributes<any> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

export function StarBorder({
  as: Component = "button",
  className = "",
  color = "var(--accent)",
  speed = "6s",
  thickness = 1.5,
  children,
  style,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        ...style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
}

export default StarBorder;
