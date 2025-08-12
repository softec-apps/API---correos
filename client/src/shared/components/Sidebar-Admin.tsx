'use client'

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { AppSidebar } from './Admin-sidebar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { ReactNode, useEffect, useState } from 'react'
import { Typography } from '@/components/ui/typography'
import { LucideLogOut, LucideMoon, LucideSun } from 'lucide-react'
import { DynamicBreadcrumb } from '@/shared/components/DynamicBreadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Footer } from './Footer'

export function SidebarAdmin({ children }: { children: ReactNode }) {
	const { theme, setTheme } = useTheme()
	const { user: dataSession, logout } = useAuth()

	const [mounted, setMounted] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

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
		<SidebarProvider>
			<div className='flex h-full w-full overflow-hidden'>
				<AppSidebar />

				<SidebarInset className='flex h-screen w-full flex-1 flex-col space-y-4 overflow-hidden overflow-y-auto px-4'>
					{/* Header */}
					<header className='bg-primary-foreground sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2'>
						<div className='flex items-center gap-2'>
							<SidebarTrigger className='-ml-1' />
							<DynamicBreadcrumb />
						</div>

						{dataSession && (
							<div className='flex items-end gap-2'>
								<Button variant='ghost' size='icon' onClick={toggleTheme}>
									{mounted && theme === 'dark' ? <LucideSun /> : <LucideMoon />}
								</Button>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
											<Avatar className='size-7'>
												<AvatarImage
													src='https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'
													alt='avatar'
												/>
												<AvatarFallback>{dataSession?.name}</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent className='w-56' align='end' forceMount>
										<DropdownMenuLabel className='font-normal'>
											<div className='flex flex-col space-y-1'>
												<p className='text-sm leading-none font-medium'>{dataSession?.name}</p>
												<p className='text-muted-foreground text-xs leading-none'>{dataSession?.email}</p>
											</div>
										</DropdownMenuLabel>

										<DropdownMenuSeparator />

										<DropdownMenuItem onClick={() => logout()} className='text-destructive cursor-pointer'>
											<LucideLogOut className='h-4 w-4' />
											<Typography variant='span'>Cerrar sesión</Typography>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</header>

					{/* Contenido */}
					<div className='flex min-h-screen flex-col'>
						<div className='flex-1'>{children}</div>
						<Footer />
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
