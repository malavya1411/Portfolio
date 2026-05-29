/**
 * Merge class names conditionally.
 * Tiny clsx-like utility to avoid external dependencies.
 */

type ClassValue = string | boolean | undefined | null | ClassValue[] | Record<string, boolean>;

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

function clsx(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      const inner = clsx(...arg);
      if (inner) classes.push(inner);
    } else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
