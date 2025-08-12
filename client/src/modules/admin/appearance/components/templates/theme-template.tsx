'use client'

import { useThemeConfig } from '@/common/providers/ActiveThemeProvider'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { THEMES } from '@/modules/admin/appearance/utils/colors'
import { DensityModeCard } from '@/modules/admin/appearance/components/DensityModeCard'
import { DarkModeCard } from '@/modules/admin/appearance/components/DarkModeCard'
import { ThemeCategorySection } from '@/modules/admin/appearance/components/ThemeCategorySection'
import { LuMonitorCog } from 'react-icons/lu'
import { Typography } from '@/components/ui/typography'

export function ThemeSelector() {
	// For color themes (gruvbox, nord, etc.)
	const { activeTheme, setActiveTheme } = useThemeConfig()
	const [isScaled, setIsScaled] = useState(activeTheme.includes('-scaled'))

	// For light/dark mode
	const { setTheme } = useTheme()

	// Handle color theme change (gruvbox, nord, etc.)
	const handleColorThemeChange = (themeValue: string, hasScaled: boolean) => {
		const finalTheme = isScaled && hasScaled ? `${themeValue}-scaled` : themeValue
		setActiveTheme(finalTheme)
	}

	// Handle scaled density toggle
	const handleScaledToggle = (checked: boolean) => {
		setIsScaled(checked)
		const baseTheme = activeTheme.replace('-scaled', '')
		const themeHasScaled = THEMES.default.concat(THEMES.alternative).some(t => t.value === baseTheme)
		setActiveTheme(checked && themeHasScaled ? `${baseTheme}-scaled` : baseTheme)
	}

	// Handle light/dark mode toggle
	const handleLightDarkToggle = (checked: boolean) => {
		const newTheme = checked ? 'dark' : 'light'
		setTheme(newTheme)
	}


	
	
	return (
		<div className='flex w-full flex-col gap-6'>
			<div className='flex items-center gap-4 text-2xl'>
				<LuMonitorCog />
				<Typography variant='h3'>Apariencia</Typography>
			</div>

			<DensityModeCard isScaled={isScaled} onScaledChange={handleScaledToggle} />

			<DarkModeCard onThemeChange={handleLightDarkToggle} />

			<Card className='text-primary shadow-none'>
				<CardHeader>
					<CardTitle>Tema de la aplicación</CardTitle>
					<CardDescription>
						Dale a tu aplicación un toque personal. Elige entre nuestros temas cuidadosamente diseñados o ajusta la
						densidad de contenido para adaptarlo a tu estilo. Los cambios se aplicarán instantáneamente.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{Object.entries(THEMES).map(([category, themes]) => (
						<ThemeCategorySection
							key={category}
							category={category}
							themes={themes}
							isScaled={isScaled}
							activeTheme={activeTheme}
							onThemeSelect={handleColorThemeChange}
						/>
					))}
				</CardContent>
			</Card>
		</div>
	)
}
