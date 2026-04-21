import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "ghost" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white hover:bg-[#43089f] hover:text-white border border-black",
  ghost:
    "bg-transparent text-black border border-[#717989] hover:bg-[#fc7981] hover:text-white hover:border-[#fc7981]",
  white:
    "bg-white text-black border border-[#dad4c8] hover:bg-[#fbbd41] hover:border-[#fbbd41]",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "clay-btn-hover inline-flex items-center justify-center gap-2",
        "rounded-xl px-5 py-2.5 text-base font-medium",
        "transition-all duration-200 cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
