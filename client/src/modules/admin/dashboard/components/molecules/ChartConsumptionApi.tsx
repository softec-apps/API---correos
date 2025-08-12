'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
const chartData = [
	{ month: 'Enero', mailSuccess: 16, mailError: 3 },
	{ month: 'Febrero', mailSuccess: 35, mailError: 0 },
	{ month: 'Marzo', mailSuccess: 27, mailError: 1 },
	{ month: 'Abril', mailSuccess: 73, mailError: 3 },
	{ month: 'Mayo', mailSuccess: 29, mailError: 0 },
	{ month: 'Junio', mailSuccess: 24, mailError: 1 },
]

const chartConfig = {
	mailSuccess: {
		label: 'Enviados',
		color: 'hsl(var(--chart-1))',
	},
	mailError: {
		label: 'Errores',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export function ChartConsumptionApi() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bar Chart - Multiple</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
						<Bar dataKey='mailSuccess' fill='var(--color-chart-2)' radius={4} />
						<Bar dataKey='mailError' fill='var(--color-chart-5)' radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 leading-none font-medium'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>Showing total visitors for the last 6 months</div>
			</CardFooter>
		</Card>
	)
}
