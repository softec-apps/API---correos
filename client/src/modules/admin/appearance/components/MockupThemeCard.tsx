import { cn } from '@/lib/utils'

export function MockupThemeCard({
	theme,
	isActive,
	onClick,
}: {
	theme: {
		name: string
		value: string
		colors: Record<string, string>
		isScaled: boolean
	}
	isActive: boolean
	onClick: () => void
}) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex cursor-pointer flex-col overflow-hidden rounded-lg transition-all duration-500',
				theme.colors.background,
				isActive ? 'ring-primary ring-2' : 'ring-2 ring-neutral-200 dark:ring-neutral-700'
			)}>
			{/* Mini page preview */}
			<div className={cn('overflow-hidden rounded-t-lg', theme.colors.card)}>
				{/* Header */}
				<div className={cn('flex items-center justify-between p-2', theme.colors.navbar)}>
					<span className={cn('truncate text-sm font-bold', theme.colors.text)}>{theme.name}</span>
					<div className='flex space-x-1'>
						<div className={cn('h-3 w-3 rounded-full', theme.colors.primary)}></div>
						<div className={cn('h-3 w-3 rounded-full', theme.colors.secondary)}></div>
						<div className={cn('h-3 w-3 rounded-full', theme.colors.button.split(' ')[0])}></div>
					</div>
				</div>

				{/* Hero Section */}
				<div className='p-2'>
					<div className={cn('mb-2 h-16 animate-pulse rounded-lg', theme.colors.primary)}></div>
					<div className='mb-2 grid grid-cols-2 gap-2'>
						<div className={cn('h-8 rounded', theme.colors.secondary)}></div>
						<div className={cn('h-8 rounded', theme.colors.button)}></div>
					</div>
					<div className={cn('mx-auto h-4 w-3/4 rounded', theme.colors.secondary)}></div>
				</div>
			</div>
		</div>
	)
}
