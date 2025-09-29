import * as React from 'react'
import { Slot as SlotPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'border bg-primary text-primary-foreground px-3 py-1 text-sm cursor-pointer hover:bg-secondary focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 transition-all duration-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  asChild?: boolean
  link?: string
}

function Badge({
  className,
  variant,
  asChild = false,
  link,
  ...props
}: BadgeProps & React.HTMLAttributes<HTMLElement>) {
  if (asChild) {
    return (
      <SlotPrimitive.Root
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }

  if (link) {
    return (
      <a
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }

  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    />
  )
}

export { Badge, badgeVariants }
