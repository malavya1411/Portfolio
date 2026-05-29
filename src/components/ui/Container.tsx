import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1200px] px-6 sm:px-5 lg:px-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
