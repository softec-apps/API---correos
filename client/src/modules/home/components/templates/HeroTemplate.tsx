'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTE_PATH } from '@/common/constants/routes'
import { BASE_URL_API } from '@/common/constants/base-url'

export const HeroTemplate = () => {
	return (
		<>
			<section className='relative overflow-hidden'>
				<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,#f472b6_0%,transparent_70%)] before:opacity-10 before:blur-[100px] before:transition-opacity before:duration-500 before:content-[''] group-hover:before:opacity-30 motion-reduce:before:blur-[80px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] dark:before:bg-[radial-gradient(circle_at_center,#60a5fa_0%,transparent_70%)] dark:before:opacity-20"></div>
				<div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
					<div className='text-center'>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className='text-4xl font-bold tracking-tight md:text-6xl'>
							Envíos de correos <span className='text-primary'>simples</span> y{' '}
							<span className='text-primary'>eficientes</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='text-muted-foreground mx-auto mt-6 max-w-3xl text-lg md:text-xl'>
							Emitto simplifica el envío masivo de correos electrónicos para empresas, con herramientas avanzadas y la
							mejor tasa de entrega.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='mt-10 flex flex-col justify-center gap-4 sm:flex-row'>
							<Link href={ROUTE_PATH.AUTH.SIGNIN} className='w-full sm:w-auto'>
								<Button size='lg' className='w-full'>
									<Rocket className='h-4 w-4' />
									Comenzar ahora
								</Button>
							</Link>
							<a
								href={`${BASE_URL_API}/openapi`}
								target='_blank'
								rel='noopener noreferrer'
								className='w-full sm:w-auto'>
								<Button size='lg' variant='outline' className='w-full backdrop-blur-lg'>
									Documentación
								</Button>
							</a>
						</motion.div>
					</div>
				</div>
			</section>
		</>
	)
}
