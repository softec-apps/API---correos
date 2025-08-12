'use client'

import { DashboardView } from '@/modules/admin/dashboard/components/views/DashboardView'
import { PrivateRoute } from '@/shared/components/PrivateRoute'
import { SidebarAdmin } from '@/shared/components/Sidebar-Admin'

export default function DashboardPage() {
	return (
		<PrivateRoute>
			<SidebarAdmin>
				<DashboardView />
			</SidebarAdmin>
		</PrivateRoute>
	)
}
