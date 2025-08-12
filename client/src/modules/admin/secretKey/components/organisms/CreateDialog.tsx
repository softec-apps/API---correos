import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { LucideLoader2, LucidePlus } from 'lucide-react'
import { useCreateSecretKey } from '@/modules/admin/secretKey/hooks/useActions'
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'

type Props = {
	onSuccess: () => void
}

export const CreateDialog = ({ onSuccess }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const { handleCreateSecretKey, loadingCreate } = useCreateSecretKey()

	// useForm hook para manejar el formulario
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
		},
	})

	const handleColorSubmit = async (data: any) => {
		if (loadingCreate) return // Evitar que se envíe si ya está cargando

		try {
			const response = await handleCreateSecretKey(data.name)
			if (response.status !== 'error') {
				onSuccess()
				reset()
				setIsOpen(false)
			}
		} catch {}
	}

	// Función para cerrar el modal y limpiar el formulario
	const handleClose = () => {
		reset()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => (open ? setIsOpen(true) : handleClose())}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsOpen(true)} size='lg'>
					<LucidePlus />
					Crear nueva
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear nueva clave</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(handleColorSubmit)} className='space-y-6'>
					<div className='space-y-2'>
						<Label htmlFor='name'>Nombre *</Label>
						<Input id='name' type='text' {...register('name', { required: 'Este campo es obligatorio' })} />
						{errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}
					</div>

					<DialogFooter className='flex w-full'>
						<Button
							type='button'
							disabled={loadingCreate}
							className='w-fuldl cursor-pointer'
							variant='ghost'
							onClick={handleClose}>
							Cancelar
						</Button>

						<Button type='submit' disabled={loadingCreate} className='cursor-pointer'>
							{loadingCreate ? (
								<span className='flex items-center gap-2'>
									<LucideLoader2 className='animate-spin' />
									Creando clave...
								</span>
							) : (
								'Crear clave'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
