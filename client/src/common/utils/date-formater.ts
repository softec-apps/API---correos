import moment from 'moment'
import 'moment/locale/es'

/**
 * Formatea una fecha ISO usando Moment.js con soporte para locale.
 * @param isoDate - Fecha en formato ISO 8601.
 * @param includeTime - Si es true, incluye hora en formato 24h.
 * @param locale - Configuración regional (ej: 'es', 'en'). Por defecto 'es'.
 * @returns Fecha formateada según el locale.
 */
export const formatISODateWithMoment = (
	isoDate: string,
	includeTime: boolean = false,
	locale: string = 'es'
): string => {
	if (!isoDate) return 'Fecha inválida'

	try {
		moment.locale(locale)
		const date = moment(isoDate)

		return includeTime
			? date.format('TLS') // "25 de diciembre de 2023 14:30:45"
			: date.format('l - LTS') // "25 de diciembre de 2023"
	} catch (error) {
		console.error('Error al formatear con Moment:', error)
		return 'Fecha inválida'
	}
}

// Funcion usada para formatear las fechas (rango de fechas) - Shadcn Calendar
interface DateRange {
	from?: Date | string | null
	to?: Date | string | null
}

export function formatDateParams(startDate?: string | Date | DateRange | null, endDate?: string | Date | null) {
	// Caso cuando startDate es un objeto de rango (como el de ShadCN)
	if (startDate && typeof startDate === 'object' && 'from' in startDate) {
		const range = startDate as DateRange
		return {
			formattedStartDate: range.from ? moment(range.from).format('YYYY-MM-DD') : null,
			formattedEndDate: range.to ? moment(range.to).format('YYYY-MM-DD') : null,
		}
	}

	// Caso tradicional con fechas separadas
	return {
		formattedStartDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
		formattedEndDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
	}
}
