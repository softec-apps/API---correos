import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { SigningForm } from '@/modules/auth/components/form/signing-form'

export const SigningView = () => {
	return (
		<main className='grid min-h-svh lg:grid-cols-5'>
			<section className='col-span-2 flex flex-col gap-4 py-20'>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs space-y-8'>
						<div>
							<Typography variant='h2' className='mx-auto max-w-2xl'>
								Bienvenido de nuevo
							</Typography>

							<Typography variant='span' className='text-muted-foreground mx-auto max-w-2xl'>
								Inicia sesión en tu cuenta
							</Typography>
						</div>

						<SigningForm />
					</div>
				</div>
			</section>

			<section className='relative col-span-3 hidden lg:block'>
				<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,#f472b6_0%,transparent_70%)] before:opacity-10 before:blur-[100px] before:transition-opacity before:duration-500 before:content-[''] group-hover:before:opacity-30 motion-reduce:before:blur-[80px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] dark:before:bg-[radial-gradient(circle_at_center,#60a5fa_0%,transparent_70%)] dark:before:opacity-20"></div>

				{/* 
				<div className='absolute inset-0 flex items-center justify-center p-12'>
					<Image
						src='https://spin.atomicobject.com/wp-content/uploads/payload.jpg'
						alt='Image'
						fill
						priority
						className='object-contain object-center'
						unoptimized
					/>
				</div>
				*/}
			</section>
		</main>
	)
}
