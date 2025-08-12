'use client'

import { motion } from 'framer-motion'
import { features } from '@/modules/home/utils/feature.util'

export const FeatureTemplate = () => {
	return (
		<>
			<section className='py-16 sm:py-24'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<motion.h2
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className='text-3xl font-bold tracking-tight sm:text-4xl'>
							Todo lo que necesitas para tus envíos
						</motion.h2>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg'>
							Características diseñadas para simplificar tu comunicación por correo
						</motion.p>
					</div>

					<div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className='bg-background rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md'>
								<div className='bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg'>
									{feature.icon}
								</div>
								<h3 className='mb-2 text-lg font-medium'>{feature.title}</h3>
								<p className='text-muted-foreground'>{feature.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
