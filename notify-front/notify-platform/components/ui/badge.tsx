import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gradient: "border-transparent bg-gradient-primary text-primary-foreground hover:bg-gradient-secondary",
        primary50: "border-transparent bg-primary-50 text-primary-900 hover:bg-primary-100",
        primary100: "border-transparent bg-primary-100 text-primary-900 hover:bg-primary-200",
        primary200: "border-transparent bg-primary-200 text-primary-900 hover:bg-primary-300",
        primary300: "border-transparent bg-primary-300 text-primary-900 hover:bg-primary-400",
        primary400: "border-transparent bg-primary-400 text-primary-900 hover:bg-primary-500",
        primary500: "border-transparent bg-primary-500 text-primary-50 hover:bg-primary-600",
        primary600: "border-transparent bg-primary-600 text-primary-50 hover:bg-primary-700",
        primary700: "border-transparent bg-primary-700 text-primary-50 hover:bg-primary-800",
        primary800: "border-transparent bg-primary-800 text-primary-50 hover:bg-primary-900",
        primary900: "border-transparent bg-primary-900 text-primary-50 hover:bg-primary-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
