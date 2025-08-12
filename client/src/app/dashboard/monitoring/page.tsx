'use client'

import { SidebarAdmin } from '@/shared/components/Sidebar-Admin'
import { PrivateRoute } from '@/shared/components/PrivateRoute'
import { GlobalErrorHandler } from '@/common/providers/InterceptorStatus'
import { MonitoringView } from '@/modules/admin/monitoring/components/views/MonitoringView'

export default function Dashboard() {
	return (
		<GlobalErrorHandler>
			<PrivateRoute>
				<SidebarAdmin>
					<MonitoringView />
				</SidebarAdmin>
			</PrivateRoute>
		</GlobalErrorHandler>
	)
}
