import { FormSendMail } from '@/modules/home/components/organisms/formSendEmail'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export function DemoSendMail() {
	return (
		<section className='mx-auto w-full max-w-3xl items-center justify-center text-center'>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
				<div className='bg-primary/10 mb-6 inline-flex items-center justify-center rounded-full px-4 py-2'>
					<Mail className='text-primary mr-2 h-5 w-5' />
					<span className='text-primary text-sm font-medium'>Demo</span>
				</div>
			</motion.div>

			<div className='px-4 text-start md:px-6'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
					<Card>
						<CardHeader>
							<CardTitle>Prueba el formulario</CardTitle>
							<CardDescription>Completa los campos para enviar un correo de prueba</CardDescription>
						</CardHeader>
						<CardContent>{FormSendMail()}</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	)
}
