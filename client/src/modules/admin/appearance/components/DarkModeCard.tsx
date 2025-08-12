'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function DarkModeCard({ onThemeChange }: { onThemeChange: (checked: boolean) => void }) {
	const { theme, systemTheme } = useTheme()
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		// Determina si el tema actual es oscuro (considerando también systemTheme)
		const currentIsDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
		setIsDark(currentIsDark)
	}, [theme, systemTheme])

	const handleSwitchChange = (checked: boolean) => {
		setIsDark(checked)
		onThemeChange(checked)
	}

	return (
		<Card className='border-none'>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle>Modo oscuro</CardTitle>
				<Switch
					id='theme-mode'
					checked={isDark}
					onCheckedChange={handleSwitchChange}
					className='data-[state=checked]:bg-primary cursor-pointer'
				/>
			</CardHeader>
			<CardContent>
				<CardDescription>
					Alterna entre los modos claro y oscuro para ajustar la apariencia de la aplicación según tus preferencias.
				</CardDescription>
			</CardContent>
		</Card>
	)
}
