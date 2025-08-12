'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ROUTE_PATH } from '@/common/constants/routes'
import { Button } from '@/components/ui/button'
import { LogoType } from '@/shared/components/LogoType'
import { LucideLayoutGrid, LucideLogOut, LucideMenu, LucideMoon, LucideSun, LucideX } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'

export const HeaderPublic = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

	// SESSION NEXT AUTH
	const { user: dataSession, logout: logoutSession, isAuthenticated } = useAuth()

	return (
		<header
			className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'bg-background/80' : 'bg-transparent'}`}>
			<div className='container mx-auto flex h-14 items-center justify-between px-2.5 md:px-0'>
				<LogoType />

				<div className='hidden items-center gap-2 md:flex'>
					<Button variant='ghost' size='xs' onClick={toggleTheme} className='rounded-md'>
						{mounted && theme === 'dark' ? <LucideSun className='size-4' /> : <LucideMoon className='size-4' />}
						<span className='sr-only'>Toggle theme</span>
					</Button>

					{!dataSession && !isAuthenticated ? (
						<Link href={ROUTE_PATH.AUTH.SIGNIN}>
							<Button size='xs' variant='outline' className=''>
								Iniciar sesión
							</Button>
						</Link>
					) : (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
										<Avatar className='h-6 w-6'>
											<AvatarImage src='' alt='avatar' />
											<AvatarFallback>USER</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent className='w-56' align='end' forceMount>
									<DropdownMenuLabel className='font-normal'>
										<div className='flex flex-col space-y-1'>
											<p className='text-muted-foreground text-xs leading-none'>{dataSession?.name}</p>
										</div>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />

									{dataSession && (
										<Link href={ROUTE_PATH.ADMIN.DASHBOARD}>
											<DropdownMenuItem className='cursor-pointer font-normal'>
												<LucideLayoutGrid className='h-4 w-4' />
												<p className='text-sm leading-none font-medium'>Dashboard</p>
											</DropdownMenuItem>
										</Link>
									)}

									<DropdownMenuSeparator />

									<DropdownMenuItem onClick={() => logoutSession()} className='text-destructive cursor-pointer'>
										<LucideLogOut className='h-4 w-4' />
										<Typography variant='span'>Cerrar sesión</Typography>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					)}
				</div>

				<div className='flex items-center gap-0 md:hidden'>
					<Button variant='ghost' size='icon' onClick={toggleTheme} className='rounded-full'>
						{mounted && theme === 'dark' ? <LucideSun className='size-4' /> : <LucideMoon className='size-4' />}
					</Button>

					<Button variant='ghost' size='icon' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						{mobileMenuOpen ? <LucideX className='size-4' /> : <LucideMenu className='size-4' />}
						<span className='sr-only'>Toggle menu</span>
					</Button>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className='bg-background absolute inset-x-0 top-14 border-b backdrop-blur-2xl md:hidden'>
					<div className='container flex flex-col gap-2 py-4'>
						{isAuthenticated ? (
							<>
								<div className='flex items-center gap-3 px-2 py-3'>
									<Avatar className='h-8 w-8'>
										<AvatarImage src='' alt='avatar' />
										<AvatarFallback>{dataSession?.name}</AvatarFallback>
									</Avatar>
									<div>
										<p className='text-sm font-medium'>{dataSession?.name}</p>
										<p className='text-muted-foreground text-xs'>{dataSession?.email}</p>
									</div>
								</div>

								<Link
									href={ROUTE_PATH.ADMIN.DASHBOARD}
									className='flex items-center gap-2 px-2 py-2 text-sm font-medium'
									onClick={() => setMobileMenuOpen(false)}>
									<LucideLayoutGrid className='h-4 w-4' />
									Dashboard
								</Link>

								<button
									onClick={() => {
										logoutSession()
										setMobileMenuOpen(false)
									}}
									className='text-destructive flex items-center gap-2 px-2 py-2 text-sm font-medium'>
									<LucideLogOut className='h-4 w-4' />
									Cerrar sesión
								</button>
							</>
						) : (
							<div className='flex flex-col gap-4'>
								<a
									href='http://localhost:4000/openapi'
									target='_blank'
									rel='noopener noreferrer'
									className='w-full px-4 py-1 text-sm sm:w-auto'
									onClick={() => setMobileMenuOpen(false)}>
									Documentación
								</a>

								<div className='mt-2 flex flex-col gap-2 border-t pt-3'>
									<Link
										href={ROUTE_PATH.AUTH.SIGNIN}
										className='w-full px-2 py-2 text-center text-sm font-medium'
										onClick={() => setMobileMenuOpen(false)}>
										Iniciar sesión
									</Link>
								</div>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</header>
	)
}
