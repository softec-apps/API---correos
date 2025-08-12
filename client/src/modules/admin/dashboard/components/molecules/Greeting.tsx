import clsx from 'clsx'
import { Card, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const Greeting = () => {
	const now = new Date()
	const hour = now.getHours()

	let saludo = ''
	let bgColor = ''

	if (hour >= 5 && hour < 12) {
		saludo = 'Buenos días ☀️'
		bgColor = 'bg-yellow-200/80'
	} else if (hour >= 12 && hour < 19) {
		saludo = 'Buenas tardes 🌤️'
		bgColor = 'bg-orange-200/80'
	} else {
		saludo = 'Buenas noches 🌙'
		bgColor = 'bg-indigo-200/80'
	}

	return (
		<Card className={clsx('border-none p-4 shadow-none', bgColor)}>
			<CardTitle className='flex items-center justify-between'>
				<Typography variant='h1' className='dark:text-secondary/90 text-secondary-foreground/90 truncate'>
					Hola, {saludo}
				</Typography>
			</CardTitle>

			<Typography variant='p' className='dark:text-secondary/90 text-secondary-foreground/90'>
				¡Es un placer tenerte de vuelta! Aquí tienes un resumen de tu actividad reciente.
			</Typography>
		</Card>
	)
}
