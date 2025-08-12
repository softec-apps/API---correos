'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import {
	SidebarMenu,
	SidebarGroup,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
} from '@/components/ui/sidebar'
import { type LucideIcon } from 'lucide-react'

export function NavProjects({
	projects,
}: {
	projects: {
		name: string
		url: string
		icon: LucideIcon
	}[]
}) {
	const pathname = usePathname()

	return (
		<SidebarGroup className='group-data-[collapsible=icon]:hidden'>
			<SidebarGroupLabel>Modulos</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map(item => {
					const isActive = pathname === item.url || (pathname.startsWith(item.url) && item.url !== '/')

					return (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton asChild className='hover:bg-muted-foreground/10'>
								<Link
									href={item.url}
									className={cn('flex w-full items-center gap-2', isActive && 'bg-accent text-accent-foreground')}>
									<item.icon className={isActive ? 'text-primary' : ''} />
									<span>{item.name}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				})}
			</SidebarMenu>
		</SidebarGroup>
	)
}
