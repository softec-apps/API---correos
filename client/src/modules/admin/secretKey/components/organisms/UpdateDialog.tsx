import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { secretKey } from '@/common/types/secretKey'
import { Controller, useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUpdateSecretKey } from '@/modules/admin/secretKey/hooks/useActions'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'

type Props = {
	secretKey: secretKey | null
	onClose: () => void
	onSuccess: () => void
}

type FormData = {
	name: string
	isActive: boolean
}

export const UpdateDialog = ({ secretKey, onClose, onSuccess }: Props) => {
	const { handleUpdateSecretKey, loadingUpdate } = useUpdateSecretKey()
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			name: secretKey?.name ?? '',
			isActive: secretKey?.isActive ?? true,
		},
	})

	const onSubmit = async (data: FormData) => {
		try {
			const response = await handleUpdateSecretKey(secretKey._id, data.name, data.isActive)

			if (response.status !== 'error') {
				onSuccess()
				reset()
				onClose()
			}
		} catch {}
	}

	const handleClose = () => {
		reset()
		onClose()
	}

	return (
		<Dialog open={true} onOpenChange={() => handleClose()}>
			<DialogContent className='max-h-screen'>
				<DialogHeader>Actualizar clave</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-2'>
						<Label htmlFor='name'>Nombre *</Label>
						<Input id='name' {...register('name', { required: 'Este campo es obligatorio' })} />
						{errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}
					</div>
					<div className='space-y-2'>
						<Label>Estado *</Label>
						<Controller
							control={control}
							name='isActive'
							render={({ field }) => (
								<RadioGroup
									value={field.value ? 'true' : 'false'}
									onValueChange={val => field.onChange(val === 'true')}
									className='flex flex-col space-y-1'>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='true' id='estado-activo' />
										<Label htmlFor='estado-activo' className='cursor-pointer'>
											Activo
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem value='false' id='estado-inactivo' />
										<Label htmlFor='estado-inactivo' className='cursor-pointer'>
											Inactivo
										</Label>
									</div>
								</RadioGroup>
							)}
						/>
						{errors.isActive && <p className='text-sm text-red-400'>{errors.isActive.message}</p>}
					</div>
					<DialogFooter className='flex w-full'>
						<Button
							type='button'
							disabled={loadingUpdate}
							className='cursor-pointer'
							variant='ghost'
							onClick={handleClose}>
							Cancelar
						</Button>
						<Button type='submit' disabled={loadingUpdate} className='cursor-pointer'>
							{loadingUpdate ? (
								<span className='flex items-center gap-2'>
									<Loader2 className='animate-spin' />
									Actualizando...
								</span>
							) : (
								'Actualizar clave'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
