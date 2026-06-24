import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 cursor-pointer select-none",
        // Sizes
        size === "sm" && "px-4 py-2 text-sm rounded-soft",
        size === "md" && "px-6 py-3 text-sm rounded-soft",
        size === "lg" && "px-8 py-4 text-base rounded-soft",
        // Variants
        variant === "primary" &&
          "bg-bloom-earth text-bloom-cream hover:bg-bloom-stone active:scale-[0.98] shadow-sm",
        variant === "secondary" &&
          "bg-bloom-rose text-bloom-earth hover:bg-bloom-rose/80 active:scale-[0.98] shadow-petal",
        variant === "ghost" &&
          "text-bloom-earth hover:bg-bloom-rose-light active:scale-[0.98]",
        variant === "outline" &&
          "border border-bloom-earth/20 text-bloom-earth hover:border-bloom-earth/50 hover:bg-bloom-mist active:scale-[0.98]",
        // Full width
        fullWidth && "w-full",
        // Disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
