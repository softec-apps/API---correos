'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { LogoType } from '@/shared/components/LogoType'
import { LucideMoon, LucideSun } from 'lucide-react'

export const HeaderAuth = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

	return (
		<header
			className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'bg-background/80 shadow-sm' : 'bg-transparent'}`}>
			<div className='container mx-auto hidden h-16 items-center justify-between px-6 md:flex md:px-0'>
				<LogoType />

				<div className='hidden items-center gap-4 md:flex'>
					<Button variant='ghost' size='icon' onClick={toggleTheme} className='rounded-full'>
						{mounted && theme === 'dark' ? (
							<LucideSun className='size-[18px]' />
						) : (
							<LucideMoon className='size-[18px]' />
						)}
						<span className='sr-only'>Toggle theme</span>
					</Button>
				</div>

				<div className='flex items-center gap-4 md:hidden'>
					<Button variant='ghost' size='icon' onClick={toggleTheme} className='rounded-full'>
						{mounted && theme === 'dark' ? (
							<LucideSun className='size-[18px]' />
						) : (
							<LucideMoon className='size-[18px]' />
						)}
					</Button>
				</div>
			</div>
		</header>
	)
}
