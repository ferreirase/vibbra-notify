import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        gradient: "bg-gradient-primary text-primary-foreground border-primary-500/50 [&>svg]:text-primary-foreground",
        primary50: "bg-primary-50 text-primary-900 border-primary-100 [&>svg]:text-primary-900",
        primary100: "bg-primary-100 text-primary-900 border-primary-200 [&>svg]:text-primary-900",
        primary200: "bg-primary-200 text-primary-900 border-primary-300 [&>svg]:text-primary-900",
        primary300: "bg-primary-300 text-primary-900 border-primary-400 [&>svg]:text-primary-900",
        primary400: "bg-primary-400 text-primary-900 border-primary-500 [&>svg]:text-primary-900",
        primary500: "bg-primary-500 text-primary-50 border-primary-600 [&>svg]:text-primary-50",
        primary600: "bg-primary-600 text-primary-50 border-primary-700 [&>svg]:text-primary-50",
        primary700: "bg-primary-700 text-primary-50 border-primary-800 [&>svg]:text-primary-50",
        primary800: "bg-primary-800 text-primary-50 border-primary-900 [&>svg]:text-primary-50",
        primary900: "bg-primary-900 text-primary-50 border-primary-800 [&>svg]:text-primary-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle }

