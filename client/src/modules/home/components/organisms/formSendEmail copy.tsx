'use client'

import * as z from 'zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { LucideLoader2 } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FileUploadDemo } from '../molecules/file-upload'
import { Label } from '@/components/ui/label'

// Esquema actualizado para múltiples archivos
const formSchema = z.object({
	secretKey: z.string().min(1, 'La clave secreta es requerida'),
	fromMail: z.string().min(1, 'Mínimo un caracter').max(100, 'Maximo 100 caracteres'),
	subjectEmail: z.string().min(1, 'El asunto es requerido'),
	sendTo: z
		.string()
		.min(1, 'Debe ingresar al menos un destinatario')
		.transform(value =>
			value
				.split(',')
				.map(email => email.trim())
				.filter(email => z.string().email().safeParse(email).success)
		)
		.refine(emails => emails.length > 0, {
			message: 'Debe incluir al menos un email válido',
		}),
	messageBody: z.string().min(1, 'El mensaje es requerido').max(5000),
	attachments: z
		.string()
		.optional()
		.transform(value => (value ? value.split(',').map(path => path.trim()) : [])),
	attachmentType: z.enum(['url', 'file', 'both']),
})

export const FormSendMail = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			secretKey: '',
			fromMail: '',
			subjectEmail: '',
			sendTo: '',
			messageBody: '',
			attachments: '',
			attachmentType: 'url',
		},
	})

	const attachmentType = form.watch('attachmentType')

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			const options = {
				method: 'POST',
				url: `${process.env.NEXT_PUBLIC_URL_API}/email/send`,
				headers: {
					'X-Key-Emitto': values.secretKey,
					'Content-Type': 'application/json',
				},
				data: {
					from: values.fromMail,
					subjectEmail: values.subjectEmail,
					sendTo: values.sendTo,
					message: values.messageBody,
					attachments: values.attachments.map(path => ({
						filename: path.split('/').pop(),
						path: path,
					})),
				},
			}

			await axios.request(options)

			toast.success('Correo enviado correctamente')
			// Resetear el formulario después del envío exitoso
			form.reset()
		} catch (error) {
			console.error('Error al enviar el correo:', error)
			if (axios.isAxiosError(error)) {
				toast.error(`Error: ${error.response?.data?.message || error.message}`)
			} else {
				toast.error('Error al enviar el correo. Por favor, inténtelo nuevamente.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='secretKey'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Clave secreta</FormLabel>
							<FormControl>
								<Input placeholder='0bcb25ef...5b2' {...field} disabled={isLoading} />
							</FormControl>
							<FormDescription>Ingresa tu clave secreta para el header x-key-emitto</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='fromMail'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Remitente</FormLabel>
							<FormControl>
								<Input placeholder='Empresa X' type='text' {...field} disabled={isLoading} />
							</FormControl>
							<FormDescription>Ingresa el nombre del remitente</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='subjectEmail'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Asunto del correo</FormLabel>
							<FormControl>
								<Input placeholder='Asunto importante' type='text' {...field} disabled={isLoading} />
							</FormControl>
							<FormDescription>Escribe el asunto del correo</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='sendTo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Destinatarios</FormLabel>
							<FormControl>
								<Textarea
									placeholder='destinatario1@ejemplo.com, destinatario2@ejemplo.com'
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormDescription>
								Ingresa los emails separados por comas. Ejemplo: email1@test.com, email2@test.com
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='messageBody'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contenido del mensaje</FormLabel>
							<FormControl>
								<Textarea placeholder='<h1>Contenido HTML del correo</h1>' rows={5} {...field} disabled={isLoading} />
							</FormControl>
							<FormDescription>Puedes usar HTML para formatear el mensaje</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Tipo de adjunto */}
				<FormField
					control={form.control}
					name='attachmentType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de adjunto</FormLabel>
							<FormControl>
								<RadioGroup value={field.value} onValueChange={field.onChange} className='flex gap-6'>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='url' id='r-url' />
										<Label htmlFor='r-url'>URL</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='file' id='r-file' />
										<Label htmlFor='r-file'>Archivo</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='both' id='r-both' />
										<Label htmlFor='r-both'>Ambos</Label>
									</div>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Campo de texto para URLs */}
				{(attachmentType === 'url' || attachmentType === 'both') && (
					<FormField
						control={form.control}
						name='attachments'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Archivos adjuntos</FormLabel>
								<FormControl>
									<Textarea placeholder='https://documento1.pdf, http://documento2.pdf' {...field} />
								</FormControl>
								<FormDescription>Rutas completas de los archivos a adjuntar, separadas por comas</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Componente para subir archivos */}
				{(attachmentType === 'file' || attachmentType === 'both') && (
					<div>
						<FormLabel className='mb-2 block'>Selecciona archivos para adjuntar</FormLabel>
						<FileUploadDemo onValueChange={setUploadedFiles} maxFiles={3} maxSize={5} />
					</div>
				)}

				<Button type='submit' disabled={isLoading}>
					{isLoading ? (
						<>
							<LucideLoader2 className='mr-2 h-4 w-4 animate-spin' />
							Enviando...
						</>
					) : (
						'Enviar Correo'
					)}
				</Button>
			</form>
		</Form>
	)
}
