interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function Tag({ label, active = false, onClick, size = "sm" }: TagProps) {
  const sizeClass = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`
          ${sizeClass} rounded-full font-medium transition-all duration-200 cursor-pointer
          ${
            active
              ? "bg-accent text-white"
              : "bg-elevated text-text-secondary hover:text-text-primary border border-border-custom hover:border-accent/40"
          }
        `}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      className={`${sizeClass} rounded-full font-medium bg-accent-muted text-accent border border-accent/20`}
    >
      {label}
    </span>
  );
}
