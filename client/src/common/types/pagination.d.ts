export interface PaginationParams {
	page?: number
	limit?: number
	search?: string | null
	orderBy?: string
	sortOrder?: 'ASC' | 'DESC'
	startDate?: string | null // Formato YYYY-MM-DD
	endDate?: string | null // Formato YYYY-MM-DD
}
