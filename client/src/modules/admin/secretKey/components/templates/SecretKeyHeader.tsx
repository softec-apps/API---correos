'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { formatNumberAbbreviated } from '@/common/utils/formatNumberCompact'
import { CreateDialog } from '@/modules/admin/secretKey/components/organisms/CreateDialog'

interface SecretKeyHeaderProps {
	totalRecords?: number
	onSuccess: () => void
}

export function SecretKeyHeader({ totalRecords, onSuccess }: SecretKeyHeaderProps): React.ReactElement {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<Typography variant='h3' className='text-secondary-foreground/85'>
					Claves de acceso
				</Typography>
				<Typography variant='p'>Totales {formatNumberAbbreviated(totalRecords)}</Typography>
			</div>

			<CreateDialog onSuccess={onSuccess} />
		</div>
	)
}
