import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium disabled:pointer-events-none disabled:opacity-50 truncate text-xs text-left before:inset-0 before:absolute before:-z-[1] before:scale-90 before:rounded-[inherit] before:bg-transparent before:transition-all relative hover:before:scale-100",
  {
    variants: {
      variant: {
        default: "text-white bg-primary-700 hover:bg-primary-800",
        destructive: "text-red-500 hover:before:bg-red-500/10",
        ghost:
          "text-black/60 hover:before:bg-black/10 aria-selected:bg-black/[0.05]",
        secondary:
          "text-black/60 bg-primary-900/10 hover:before:bg-primary-900/[0.15]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-2 py-2",
        sm: "h-8 px-2 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button as default, buttonVariants };
