import { LucideHeart } from 'lucide-react'
import { DEV_INFO } from '@/common/constants/dev-info'
import { FACTORY_INFO } from '@/common/constants/factory-info'

export function FooterPublic() {
	return (
		<footer className='bg-background border-muted w-full border-t'>
			<div className='flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-10'>
				<div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
					<p className='text-muted-foreground text-xs'>
						&copy; {new Date().getFullYear()} {FACTORY_INFO.DOAMIN} - {FACTORY_INFO.NAME}. Todos los derechos
						reservados.
					</p>
					<div className='text-muted-foreground flex items-center gap-1'>
						<span className='flex gap-1 text-xs font-medium'>
							Made with
							<LucideHeart className='text-destructive size-4' fill='currentColor' />
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
			</div>
		</footer>
	)
}
