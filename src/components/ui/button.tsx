import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-white/10 hover:bg-white/20 border border-white/[0.18] hover:border-white/35 text-white/90",
  ghost:
    "bg-transparent hover:bg-white/[0.06] text-white/60 hover:text-white/90",
  outline:
    "bg-transparent border border-white/20 hover:border-white/40 text-white/70 hover:text-white/95",
  danger:
    "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.7rem] tracking-[0.08em] px-4 py-2",
  md: "text-[0.75rem] tracking-[0.08em] px-6 py-2.5",
  lg: "text-[0.8rem] tracking-[0.08em] px-8 py-3.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium uppercase",
          "transition-all duration-200 select-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          // Variant
          variants[variant],
          // Size
          sizes[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Loading…
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };