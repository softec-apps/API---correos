import Humanize from 'humanize-plus'

export function formatNumberAbbreviated(value: number, decimals = 1) {
	if (typeof value !== 'number' || isNaN(value)) return '0'
	return Humanize.compactInteger(value, decimals)
}
