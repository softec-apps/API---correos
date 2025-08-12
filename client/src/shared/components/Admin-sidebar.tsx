'use client'

import * as React from 'react'
import {
	Settings2,
	GalleryVerticalEnd,
	AudioWaveform,
	Command,
	LucideUsers,
	LucidePackageOpen,
	LucideKeyRound,
	LucideLayoutGrid,
	LucideAreaChart,
} from 'lucide-react'
import { ROUTE_PATH } from '@/common/constants/routes'
import { NavMain } from '@/shared/components/nav-main'
import { NavProjects } from '@/shared/components/nav-projects'
import { NavUser } from '@/shared/components/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { TeamSwitcher } from '@/shared/components/team-switcher'

const data = {
	user: {
		name: 'Administrador',
		email: 'admin@tienda.com',
		avatar:
			'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'productos',
			url: ROUTE_PATH.ADMIN.USER,
			icon: LucidePackageOpen,
			items: [{ title: 'Categorias', url: ROUTE_PATH.ADMIN.USER }],
		},
		{
			title: 'Configuración',
			url: '/settings',
			icon: Settings2,
			items: [
				{ title: 'General', url: '/settings/general' },
				{ title: 'Pagos', url: '/settings/payments' },
				{ title: 'Envíos', url: '/settings/shipping' },
			],
		},
	],
	projects: [
		{ name: 'Claves', url: ROUTE_PATH.ADMIN.SECRET_KEY, icon: LucideKeyRound },
		{ name: 'Monitoreo', url: ROUTE_PATH.ADMIN.MONITORING, icon: LucideAreaChart },
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' variant='floating' {...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>

			<SidebarContent>
				<NavProjects projects={data.projects} />
				{/*
				<NavMain items={data.navMain} />
				*/}
			</SidebarContent>

			{/*
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			*/}

			<SidebarRail />
		</Sidebar>
	)
}
