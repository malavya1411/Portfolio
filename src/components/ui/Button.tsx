"use client";

import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
  secondary:
    "bg-elevated text-text-primary border border-border-custom hover:bg-surface",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-elevated",
  outline:
    "border border-border-custom text-text-primary hover:border-accent hover:text-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-[14px] font-medium
    transition-all duration-250 ease-out
    focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    cursor-pointer
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={baseClasses} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
