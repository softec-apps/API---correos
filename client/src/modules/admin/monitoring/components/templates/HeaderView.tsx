'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'

export function HeaderView() {
	return (
		<div>
			<Typography variant='h3' className='text-secondary-foreground/85'>
				Monitoreo del sistema
			</Typography>
			<Typography variant='p'>
				Observa y administra en tiempo real el estado de tus colas de procesamiento. Selecciona una herramienta para
				abrir su panel completo.
			</Typography>
		</div>
	)
}
