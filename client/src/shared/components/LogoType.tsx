import Link from 'next/link'
import { BiSolidSend } from 'react-icons/bi'
import { ROUTE_PATH } from '@/common/constants/routes'
import { FACTORY_INFO } from '@/common/constants/factory-info'

export const LogoType = () => {
	return (
		<Link href={ROUTE_PATH.HOME} className='group'>
			<div className='flex items-center gap-2'>
				{/* Icono con efecto "flotante" */}
				<div className='text-primary group-hover:bg-primary/10 flex size-6 items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12'>
					<BiSolidSend className='text-lg' />
				</div>

				<span className='text-primary dark:text-primary-light text-lg font-extrabold tracking-widest'>
					{FACTORY_INFO.NAME}
				</span>
			</div>
		</Link>
	)
}

export const LogoOnly = () => {
	return (
		<Link href={ROUTE_PATH.HOME} className='group'>
			<div className='flex items-center gap-2'>
				<div className='text-primary group-hover:bg-primary/10 flex size-6 items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12'>
					<BiSolidSend className='text-lg' />
				</div>
			</div>
		</Link>
	)
}
