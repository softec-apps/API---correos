'use client'

import React from 'react'
import { LucideInfo } from 'lucide-react'
import { UtilBanner } from '@/shared/components/UtilBanner'

interface NoResultsProps {
	searchTerm: string | null
}

export function NoResults({ searchTerm }: NoResultsProps): React.ReactElement {
	return (
		<div className='flex flex-col items-center justify-center pt-10'>
			<UtilBanner
				icon={LucideInfo}
				title={searchTerm ? 'No se encontraron coincidencias' : 'No hay secret keys registradas'}
				description={searchTerm ? `No hay resultados para "${searchTerm}"` : 'No hay registros disponibles actualmente'}
			/>
		</div>
	)
}
