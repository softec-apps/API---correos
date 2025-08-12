'use client'

import { MONITOR_URLS } from '@/modules/admin/monitoring/utils/service-queue'
import { HeaderView } from '@/modules/admin/monitoring/components/templates/HeaderView'
import { MonitorCardDialog } from '@/modules/admin/monitoring/components/organisms/MonitorCardDialog'

export function MonitoringView() {
	return (
		<div className='flex flex-col items-start space-y-8'>
			<HeaderView />

			<div className='flex flex-wrap gap-4'>
				{MONITOR_URLS.map(monitor => (
					<MonitorCardDialog key={monitor.title} title={monitor.title} src={monitor.src} />
				))}
			</div>
		</div>
	)
}
