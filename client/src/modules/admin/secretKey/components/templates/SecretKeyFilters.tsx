'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DatePickerWithRange } from '@/components/ui/DatePicker'
import { LucideSearch, LucideArrowUp, LucideArrowDown, LucideFilter } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SecretKeyFiltersProps {
	search: string | null
	setSearch: (search: string | null) => void
	startDate: string | null
	endDate: string | null
	setStartDate: (date: string | null) => void
	setEndDate: (date: string | null) => void
	orderBy: string
	setOrderBy: (orderBy: string) => void
	sortOrder: 'ASC' | 'DESC'
	setSortOrder: (sortOrder: 'ASC' | 'DESC') => void
	setPage: (page: number | ((prevPage: number) => number)) => void
}

export function SecretKeyFilters({
	search,
	setSearch,
	startDate,
	endDate,
	setStartDate,
	setEndDate,
	orderBy,
	setOrderBy,
	sortOrder,
	setSortOrder,
	setPage,
}: SecretKeyFiltersProps): React.ReactElement {
	return (
		<div className='flex items-center justify-between'>
			{/* Search Input */}
			<div className='flex items-center gap-2'>
				<div className='relative w-full max-w-sm'>
					<LucideSearch className='text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2' size={16} />
					<Input
						type='text'
						placeholder='Buscar clave...'
						className='pl-8 text-sm'
						value={search || ''}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
			</div>

			{/* Filters */}
			<div className='flex items-center gap-2'>
				{/* Date Range Picker */}
				<DatePickerWithRange
					startDate={startDate}
					endDate={endDate}
					onDateChange={(newStartDate, newEndDate) => {
						setStartDate(newStartDate)
						setEndDate(newEndDate)
					}}
				/>

				{/* Sort Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='text-muted-foreground flex items-center gap-2' size='sm'>
							<LucideFilter />
							<span>Filtro</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className='w-56 p-2' align='end'>
						<div className='space-y-3'>
							{/* Field Selection */}
							<div>
								<Label className='mb-1 block text-sm font-medium'>Campo</Label>
								<Select
									value={orderBy}
									onValueChange={value => {
										setOrderBy(value)
										setPage(1)
									}}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Seleccionar campo' />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value='createdAt'>Fecha de creación</SelectItem>
										<SelectItem value='updatedAt'>Fecha de actualización</SelectItem>
										<SelectItem value='name'>Nombre</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Sort Direction */}
							<div>
								<Label className='mb-1 block text-sm font-medium'>Dirección</Label>
								<div className='flex gap-2'>
									<Button
										variant={sortOrder === 'ASC' ? 'default' : 'outline'}
										size='xs'
										className='flex-1'
										onClick={() => {
											setSortOrder('ASC')
											setPage(1)
										}}>
										<LucideArrowUp className='mr-1 h-4 w-4' />
										Asc
									</Button>
									<Button
										variant={sortOrder === 'DESC' ? 'default' : 'outline'}
										size='xs'
										className='flex-1'
										onClick={() => {
											setSortOrder('DESC')
											setPage(1)
										}}>
										<LucideArrowDown className='mr-1 h-4 w-4' />
										Desc
									</Button>
								</div>
							</div>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
