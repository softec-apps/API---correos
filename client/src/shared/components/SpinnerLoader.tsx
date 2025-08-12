import { LucideLoader } from 'lucide-react'
import { Typography } from '@/components/ui/typography'

type Props = {
	text?: string
}

export const SpinnerLoader = ({ text }: Props) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			<LucideLoader className='size-5 animate-spin' />
			{text && <Typography variant='p'>{text}</Typography>}
		</div>
	)
}
