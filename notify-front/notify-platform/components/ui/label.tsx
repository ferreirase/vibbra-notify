"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        gradient: "bg-gradient-primary bg-clip-text text-transparent",
        primary50: "text-primary-50",
        primary100: "text-primary-100",
        primary200: "text-primary-200",
        primary300: "text-primary-300",
        primary400: "text-primary-400",
        primary500: "text-primary-500",
        primary600: "text-primary-600",
        primary700: "text-primary-700",
        primary800: "text-primary-800",
        primary900: "text-primary-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
