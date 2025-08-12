import { Label } from '@/components/ui/label'
import { MockupThemeCard } from '@/modules/admin/appearance/components/MockupThemeCard'

export function ThemeCategorySection({
	category,
	themes,
	isScaled,
	activeTheme,
	onThemeSelect,
}: {
	category: string
	themes: Array<{
		name: string
		value: string
		scaledValue?: string
		colors: Record<string, string>
	}>
	isScaled: boolean
	activeTheme: string
	onThemeSelect: (themeValue: string, hasScaled: boolean) => void
}) {
	const categoryName =
		category === 'default' ? 'Temas Clásicos' : category === 'alternative' ? 'Temas Creativos' : 'Temas Minimalistas'

	return (
		<div key={category} className='w-full space-y-4'>
			<Label>{categoryName}</Label>
			<div className='grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{themes.map(theme => {
					const hasScaled = 'scaledValue' in theme
					const isActive = activeTheme === (isScaled && hasScaled ? theme.scaledValue : theme.value)

					return (
						<MockupThemeCard
							key={theme.value}
							theme={{
								name: theme.name,
								value: hasScaled && isScaled ? (theme.scaledValue ?? theme.value) : theme.value,
								colors: theme.colors,
								isScaled: isScaled && hasScaled,
							}}
							isActive={isActive}
							onClick={() => onThemeSelect(theme.value, hasScaled)}
						/>
					)
				})}
			</div>
		</div>
	)
}
