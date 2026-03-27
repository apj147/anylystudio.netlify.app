import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A959] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#C9A959] text-[#1A1A1A] hover:bg-[#A8883A] shadow-sm',
        outline:
          'border border-[#C9A959] text-[#C9A959] bg-transparent hover:bg-[#C9A959] hover:text-[#1A1A1A]',
        ghost: 'text-[#2C2C2C] hover:bg-[#FAF7F2] hover:text-[#C9A959]',
        sage: 'bg-[#8B9A7D] text-white hover:bg-[#6B7A5D]',
        dark: 'bg-[#1A1A1A] text-[#FAF7F2] hover:bg-[#2C2C2C]',
        link: 'text-[#C9A959] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-8 py-3',
        sm: 'h-9 px-6 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
