'use client'

import React from 'react'
import { LucideInfo } from 'lucide-react'
import { UtilBanner } from '@/shared/components/UtilBanner'
import { CreateDialog } from '@/modules/admin/secretKey/components/organisms/CreateDialog'

export function EmptyState(): React.ReactElement {
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<UtilBanner
				icon={LucideInfo}
				title='No se encontraron claves de acceso'
				description='Aún no hay claves de acceso registradas en el sistema.'
			/>
			<CreateDialog />
		</div>
	)
}
