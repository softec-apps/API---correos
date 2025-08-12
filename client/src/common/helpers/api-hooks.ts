import api from '@/lib/axios'
import { useCallback, useEffect, useState } from 'react'
import { PaginationParams } from '@/common/types/pagination'
import { formatDateParams } from '@/common/utils/date-formater'
import { extractErrorMessage } from '@/common/helpers/errorHandler'

interface UseApiFindAllOptions<T> extends PaginationParams {
	endpoint: string
	initialData?: T | null
	enabled?: boolean
}

export function useApiFindAll<T>({
	endpoint,
	page = 1,
	limit = 10,
	search = '',
	orderBy = 'createdAt',
	sortOrder = 'DESC',
	startDate = null,
	endDate = null,
	initialData = null,
	enabled = true,
}: UseApiFindAllOptions<T>) {
	const [data, setData] = useState<T | null>(initialData)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [reloadIndex, setReloadIndex] = useState(0)

	// Procesamiento correcto de fechas
	const processDates = () => {
		// Caso 1: startDate es un objeto de rango (ShadCN)
		if (startDate && typeof startDate === 'object' && 'from' in startDate) {
			return formatDateParams(startDate.from, startDate.to)
		}

		// Caso 2: fechas separadas tradicionales
		return formatDateParams(startDate, endDate)
	}

	const { formattedStartDate, formattedEndDate } = processDates()

	const fetchData = useCallback(async () => {
		if (!enabled) {
			setLoading(false)
			return
		}

		setLoading(true)
		setError(null)

		try {
			const params = {
				page,
				limit,
				search,
				orderBy,
				sortOrder,
				...(formattedStartDate && { startDate: formattedStartDate }),
				...(formattedEndDate && { endDate: formattedEndDate }),
			}

			const { data: result } = await api.get(endpoint, { params })
			setData(result)
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}, [endpoint, page, limit, search, orderBy, sortOrder, formattedStartDate, formattedEndDate, enabled])

	const refetch = useCallback(() => {
		setReloadIndex(prev => prev + 1)
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData, reloadIndex])

	return {
		data,
		loading,
		error,
		refetch,
	}
}
