'use client'

import React from 'react'
import { LucideServer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UtilBanner } from '@/shared/components/UtilBanner'

interface ErrorStateProps {
	onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps): React.ReactElement {
	return (
		<div className='flex h-screen flex-col items-center justify-center space-y-2'>
			<UtilBanner
				icon={LucideServer}
				title='Error 500'
				description='Hubo un problema en el servidor. Por favor, inténtalo de nuevo más tarde.'
			/>
			<Button size='xs' onClick={onRetry} className='flex items-center gap-1'>
				<span>Reintentar</span>
			</Button>
		</div>
	)
}
