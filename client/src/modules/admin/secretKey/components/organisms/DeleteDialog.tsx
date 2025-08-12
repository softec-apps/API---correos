import { useState } from 'react'

// TYPES
import { secretKey } from '@/common/types/secretKey'

// HOOKS
import { useDeleteSecretKey } from '@/modules/admin/secretKey/hooks/useActions'

// COMPONENTS
import { Button } from '@/components/ui/button'
import { Loader2, LucideTrash } from 'lucide-react'
import { Typography } from '@/components/ui/typography'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Props = {
	secretKey: secretKey | null
	onClose: () => void
	onSuccess: () => void
}

export function DeleteDialog({ secretKey, onClose, onSuccess }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { handleDeleteSecretKey } = useDeleteSecretKey()

	const handleConfirmDelete = async () => {
		try {
			setIsSubmitting(true)
			if (secretKey?._id) await handleDeleteSecretKey(secretKey._id)
			onSuccess()
		} catch {
		} finally {
			setIsSubmitting(false)
			onClose()
		}
	}

	return (
		<Dialog open onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirmar eliminación</DialogTitle>
				</DialogHeader>

				<Typography variant='p'>
					¿Estás seguro que deseas eliminar la clave <strong>{secretKey?.name}</strong>?
				</Typography>

				<DialogFooter>
					<Button variant='ghost' onClick={onClose} disabled={isSubmitting}>
						Cancelar
					</Button>

					<Button variant='destructive' onClick={handleConfirmDelete} disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Eliminando...
							</>
						) : (
							<>
								<LucideTrash className='h-4 w-4' />
								Eliminar
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
