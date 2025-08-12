import api from '@/lib/axios'
import { toast } from 'sonner'
import { useState } from 'react'

export const useCreateSecretKey = () => {
	const [loading, setLoading] = useState(false)

	const handleCreateSecretKey = async (name: string) => {
		setLoading(true)
		try {
			const response = await api.post('/secret-key', { name })
			toast.success('Clave creada correctamente')
			return { status: 'success', data: response.data }
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Error al crear la clave'
			toast.error(errorMessage)

			return { status: 'error', message: errorMessage }
		} finally {
			setLoading(false)
		}
	}

	return { handleCreateSecretKey, loadingCreate: loading }
}

export const useUpdateSecretKey = () => {
	const [loading, setLoading] = useState(false)

	const handleUpdateSecretKey = async (id: string, name: string, isActive: boolean) => {
		setLoading(true)
		try {
			const response = await api.put(`/secret-key/${id}`, { name, isActive })
			toast.success(response?.data?.message)
			return { status: 'success', data: response.data }
		} catch (error) {
			const errorMessage = error.response?.data?.message
			toast.error(errorMessage)
			return { status: 'error', message: errorMessage }
		} finally {
			setLoading(false)
		}
	}

	return { handleUpdateSecretKey, loadingUpdate: loading }
}

export const useDeleteSecretKey = () => {
	const [loading, setLoading] = useState(false)

	const handleDeleteSecretKey = async (id: string) => {
		setLoading(true)
		try {
			const response = await api.delete(`/secret-key/${id}`)
			toast.success(response?.data?.message)
			return { status: 'success', data: response.data }
		} catch (error) {
			const errorMessage = error.response?.data?.message
			toast.error(errorMessage)
			return { status: 'error', message: errorMessage }
		} finally {
			setLoading(false)
		}
	}

	return { handleDeleteSecretKey, loadingDelete: loading }
}
