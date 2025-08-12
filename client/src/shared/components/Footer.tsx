import { BiSolidHeart } from 'react-icons/bi'
import { DEV_INFO } from '@/common/constants/dev-info'
import { FACTORY_INFO } from '@/common/constants/factory-info'

export const Footer = () => {
	return (
		<footer className='py-4'>
			<div className='text-muted-foreground flex flex-col items-center justify-between gap-2 pt-3 text-xs sm:flex-row sm:gap-0'>
				<span>
					&copy; {new Date().getFullYear()} {FACTORY_INFO.DOAMIN} - {FACTORY_INFO.NAME}. Todos los derechos reservados.
				</span>
				<div className='flex items-center gap-1'>
					<span className='flex gap-1 text-xs font-medium'>
						Made with
						<BiSolidHeart className='text-destructive animate-pulse' size={14} />
						by
					</span>
					<div className='flex items-center gap-2'>
						<a
							href={DEV_INFO.SOCIAL.FB}
							className='block text-xs font-medium underline transition-colors duration-200 hover:text-neutral-700'
							target='_blank'
							rel='noopener noreferrer'>
							{DEV_INFO.NAME}
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
