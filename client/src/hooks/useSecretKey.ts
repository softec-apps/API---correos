import { useApiFindAll } from '@/common/helpers/api-hooks'
import { PAGINATION } from '@/common/constants/pagination'
import { PaginationParams } from '@/common/types/pagination'
import { ENDPOINT_API } from '@/common/constants/api-endpoint'

export function useFindAllSecretKeys({
	page = PAGINATION.PAGE,
	limit = PAGINATION.LIMIT,
	search = '',
	orderBy = 'createdAt',
	sortOrder = 'DESC',
	startDate = null,
	endDate = null,
}: PaginationParams = {}) {
	const result = useApiFindAll({
		endpoint: ENDPOINT_API.SECRET_KEY,
		page,
		limit,
		search,
		orderBy,
		sortOrder,
		startDate,
		endDate,
	})

	return {
		secretKey: result.data,
		loading: result.loading,
		error: result.error,
		reFetchSecretKey: result.refetch,
	}
}
