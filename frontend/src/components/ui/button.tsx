import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-gradient-to-r from-[#FF8C42] to-[#E67A35] text-white hover:from-[#E67A35] hover:to-[#FF8C42] shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] text-white hover:from-[#3DBDB5] hover:to-[#4ECDC4] shadow-lg hover:shadow-xl",
      outline: "border-2 border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42] hover:text-white",
      ghost: "text-gray-600 hover:text-[#FF8C42] hover:bg-gray-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
