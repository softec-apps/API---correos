export type secretKey = {
	_id?: string | null
	name: string
	secret_key: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface SecretKeyResponse {
	data: Array<{
		_id: string
		isActive: boolean
		name: string
		secret_key: string
		createdAt: string
		updatedAt: string
	}>
	meta?: {
		pagination: {
			currentPage: number
			totalPages: number
			totalRecords: number
			hasNextPage: boolean
			hasPreviousPage: boolean
			limit: number
		}
	}
}
