'use client'

import * as React from 'react'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { LogoOnly } from './LogoType'

export function TeamSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:text-sidebar-transparent data-[state=open]:bg-transparent'>
							<div className='flex aspect-square size-8 items-center justify-center'>
								<LogoOnly />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate text-xl font-bold'>EMITTO</span>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
