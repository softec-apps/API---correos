import { ApiError } from '@/common/types/apiError'

export function extractErrorMessage(error: unknown): string {
	const apiError = error as { response?: { data?: ApiError } }

	if (Array.isArray(apiError.response?.data?.message)) return apiError.response.data.message.join('\n')

	return apiError.response?.data?.message || (error as Error).message || 'Error desconocido'
}
