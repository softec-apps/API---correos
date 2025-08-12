import { Typography } from '@/components/ui/typography'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
	title: string
	description: string
	icon: React.ElementType
}

export const UtilBanner = ({ title, description, icon: Icon }: Props) => {
	return (
		<Card className='shadow- text-primary w-full border-none bg-transparent'>
			<CardHeader>
				<CardTitle className='flex flex-col items-center gap-4 text-center'>
					<Icon className='size-10' />
					<Typography variant='h5' className='font-semibold'>
						{title}
					</Typography>
				</CardTitle>

				<div className='flex flex-col items-center gap-4 text-center'>
					<Typography variant='muted'>{description}</Typography>
				</div>
			</CardHeader>
		</Card>
	)
}
