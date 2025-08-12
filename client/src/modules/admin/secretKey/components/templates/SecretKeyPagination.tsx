'use client'

import { LucideLoader } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { Typography } from '@/components/ui/typography'
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SecretKeyPaginationProps {
	currentPage?: number
	totalPages?: number
	totalRecords?: number
	page: number
	setPage: (page: number | ((prevPage: number) => number)) => void
	limit: number
	setLimit: (limit: number) => void
	loading: boolean
}

export function SecretKeyPagination({
	currentPage = 1,
	totalPages = 1,
	totalRecords = 0,
	page,
	setPage,
	limit,
	setLimit,
	loading,
}: SecretKeyPaginationProps): React.ReactElement {
	const [isLoadingPrev, setIsLoadingPrev] = useState<boolean>(false)
	const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false)

	// Manejo de la paginación
	const handlePrevPage = (): void => {
		if (page > 1) {
			setIsLoadingPrev(true)
			setPage(prev => prev - 1)
		}
	}

	const handleNextPage = (): void => {
		if (currentPage < totalPages) {
			setIsLoadingNext(true)
			setPage(prev => prev + 1)
		}
	}

	// Resetear estados de carga cuando la carga de datos finaliza
	useEffect(() => {
		if (!loading) {
			setIsLoadingPrev(false)
			setIsLoadingNext(false)
		}
	}, [loading])

	const isDisabled = !totalRecords || currentPage === 1
	const isNextDisabled = !totalRecords || currentPage === totalPages

	return (
		<div className='bg-muted/50 flex items-center justify-between rounded-md p-1'>
			<div className='flex items-center'>
				<div className='text-primary flex w-full pr-2 text-xs sm:w-auto'>
					{/* Botón "Anterior" */}
					<Button
						variant='ghost'
						size='sm'
						disabled={isDisabled || loading || isLoadingPrev}
						onClick={handlePrevPage}
						className='flex items-center gap-1'>
						{isLoadingPrev ? (
							<>
								<LucideLoader className='animate-spin' size={16} />
								<span>Anterior</span>
							</>
						) : (
							<>
								<BiCaretLeft />
								<span>Anterior</span>
							</>
						)}
					</Button>

					{/* Botón "Siguiente" */}
					<Button
						variant='ghost'
						size='sm'
						disabled={isNextDisabled || loading || isLoadingNext}
						onClick={handleNextPage}
						className='flex items-center gap-1'>
						{isLoadingNext ? (
							<>
								<span>Siguiente</span>
								<LucideLoader className='animate-spin' size={16} />
							</>
						) : (
							<>
								<span>Siguiente</span>
								<BiCaretRight size={16} />
							</>
						)}
					</Button>
				</div>

				{/* Información de páginas */}
				<div className='flex items-center gap-2'>
					<Typography variant='span' className='text-muted-foreground'>
						Página {currentPage} - {totalPages}
					</Typography>
				</div>
			</div>

			{/* Selector de límite por página */}
			<div className='flex items-center gap-2'>
				<Label htmlFor='limit' className='text-muted-foreground text-sm'>
					Resultados por página
				</Label>

				<Select
					value={limit.toString()}
					onValueChange={value => {
						setLimit(Number(value))
						setPage(1)
					}}>
					<SelectTrigger className='px-2 py-1' size='sm'>
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value='5'>5</SelectItem>
						<SelectItem value='10'>10</SelectItem>
						<SelectItem value='15'>15</SelectItem>
						<SelectItem value='20'>20</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
