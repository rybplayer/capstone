import { cva, type VariantProps } from 'class-variance-authority'

export const cardVariants = cva(
  'rounded-xl border p-4 transition-colors duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default:
          'hover:bg-foreground/6 bg-foreground/3 hover:border-foreground/15 border-foreground/5 border-2',
      },
      hover: {
        enabled: '',
        disabled: 'hover:bg-foreground/6 hover:border-foreground/15',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'enabled',
    },
  },
)

export type CardVariants = VariantProps<typeof cardVariants>
