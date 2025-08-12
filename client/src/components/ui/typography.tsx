import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import React from 'react'

const typographyVariants = cva('text-primary', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
			h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
			h6: 'scroll-m-20 text-base font-semibold tracking-tight',
			p: 'leading-7',
			span: 'inline text-sm',
			small: 'text-sm font-medium leading-none',
			muted: 'text-sm text-muted-foreground',
			lead: 'text-xl text-muted-foreground',
			blockquote: 'border-l-2 pl-6 italic',
			code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
			strong: 'font-semibold',
		},
	},
	defaultVariants: {
		variant: 'p',
	},
})

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
	as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	({ className, variant, as: Comp = 'p', ...props }, ref) => {
		return <Comp className={cn(typographyVariants({ variant }), className)} ref={ref} {...props} />
	}
)

Typography.displayName = 'Typography'

export { Typography }
