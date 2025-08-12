'use client'

import { SidebarAdmin } from '@/shared/components/Sidebar-Admin'
import { PrivateRoute } from '@/shared/components/PrivateRoute'
import { SecretKeyView } from '@/modules/admin/secretKey/components/views/SecretKeyView'
import { GlobalErrorHandler } from '@/common/providers/InterceptorStatus'

export default function Dashboard() {
	return (
		<GlobalErrorHandler>
			<PrivateRoute>
				<SidebarAdmin>
					<SecretKeyView />
				</SidebarAdmin>
			</PrivateRoute>
		</GlobalErrorHandler>
	)
}
