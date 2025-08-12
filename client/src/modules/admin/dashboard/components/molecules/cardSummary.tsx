import { Skeleton } from '@/components/ui/skeleton'
import { LucideIcon, LucideUser } from 'lucide-react'
import { Typography } from '@/components/ui/typography'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface CardStatisticsProps {
	value: number
	label: string
	singularLabel?: string
	icon?: LucideIcon
	iconBgColor?: string
	iconColor?: string
	className?: string
	loading?: boolean
	error?: Error | null
}

export const CardStatistics = ({
	value,
	label,
	singularLabel,
	icon: Icon = LucideUser,
	iconBgColor = 'bg-neutral-100 dark:bg-neutral-800/50',
	iconColor = 'text-neutral-300',
	loading = false,
	error = null,
}: CardStatisticsProps) => {
	if (error) {
		return (
			<Card className='p-0'>
				<CardHeader>
					<Typography variant='h4' className='text-destructive font-bold'>
						Error: {error.message}
					</Typography>
				</CardHeader>
			</Card>
		)
	}

	if (loading)
		return (
			<Card className='p-0'>
				<Skeleton className='bg-muted h-20 w-full' />
			</Card>
		)

	return (
		<Card>
			<CardHeader className='flex w-full flex-row items-center justify-between'>
				<CardTitle className='flex w-full items-center gap-4 text-sm font-medium'>
					<div className={`rounded-lg p-2 ${iconBgColor} ${iconColor}`}>
						<Icon className='size-10' />
					</div>

					<div className='flex flex-col'>
						<Typography variant='h3' className='font-bold'>
							{value}
						</Typography>
						<Typography variant='h6' className='font-medium'>
							{value === 1 ? singularLabel || label : label} totales
						</Typography>
					</div>
				</CardTitle>
			</CardHeader>
		</Card>
	)
}
