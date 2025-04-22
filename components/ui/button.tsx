import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-coral text-white hover:bg-coral-dark",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input dark:border-white/20 bg-transparent dark:bg-transparent dark:text-neutral-100 hover:bg-background dark:hover:bg-slate-100 dark:hover:text-background-dark hover:text-accent",
        secondary: "bg-blue text-white hover:bg-blue-lighter",
        ghost: "hover:underline",
        // ghost: "hover:bg-muted hover:text-accent-foreground",
        link: "text-coral underline-offset-4 hover:underline",
        coral: "bg-gradient-coral text-white hover:shadow-md transition-shadow",
        blue: "bg-gradient-blue text-white hover:shadow-md transition-shadow",
        colorful:
          "relative text-white overflow-hidden bg-gradient-to-r from-green to-coral hover:bg-gradient-to-r hover:from-coral hover:to-blue hover:shadow-md transition-all duration-300",
        teal: "bg-teal text-white hover:bg-teal-dark",
        purple: "bg-purple text-white hover:bg-purple-dark",
        amber: "bg-amber text-white hover:bg-amber-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // For the colorful variant, wrap children in a span for z-index
    const content =
      variant === "colorful" ? (
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      ) : (
        children
      );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          variant === "colorful" ? "btn-colorful" : ""
        )}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
