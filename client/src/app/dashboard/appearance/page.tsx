import { AppearanceView } from '@/modules/admin/appearance/components/view/AppearanceView'
import { SidebarAdmin } from '@/shared/components/Sidebar-Admin'

export default function AppearancePage() {
	return (
		<SidebarAdmin>
			<AppearanceView />
		</SidebarAdmin>
	)
}
