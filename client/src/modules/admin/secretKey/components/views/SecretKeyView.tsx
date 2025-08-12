'use client'

import { useState } from 'react'
import { LucideInfo } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { secretKey } from '@/common/types/secretKey'
import { useFindAllSecretKeys } from '@/hooks/useSecretKey'
import { UtilBanner } from '@/shared/components/UtilBanner'



// Componentes
import { EmptyState } from '@/modules/admin/secretKey/components/templates/EmptyState'
import { UpdateDialog } from '@/modules/admin/secretKey/components/organisms/UpdateDialog'
import { DeleteDialog } from '@/modules/admin/secretKey/components/organisms/DeleteDialog'
import { SecretKeyTable } from '@/modules/admin/secretKey/components/organisms/SecretKeyTable'
import { SecretKeyHeader } from '@/modules/admin/secretKey/components/templates/SecretKeyHeader'
import { SecretKeyFilters } from '@/modules/admin/secretKey/components/templates/SecretKeyFilters'
import { SecretKeyPagination } from '@/modules/admin/secretKey/components/templates/SecretKeyPagination'

export function SecretKeyView() {
	// Estados para la paginación y filtros
	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(10)
	const [search, setSearch] = useState<string | null>(null)
	const debouncedSearch = useDebounce(search, 500)
	const [orderBy, setOrderBy] = useState<string>('createdAt')
	const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')
	const [startDate, setStartDate] = useState<string | null>(null)
	const [endDate, setEndDate] = useState<string | null>(null)

	// Fetch de datos
	const {
		secretKey: secretKeyData,
		loading: loadingSecretKey,
		error: errorSecretKey,
		reFetchSecretKey,
	} = useFindAllSecretKeys({
		page,
		limit,
		search: debouncedSearch,
		orderBy,
		sortOrder,
		startDate,
		endDate,
	})

	// Estados para diálogos
	const [selectedToUpdate, setSelectedToUpdate] = useState<secretKey | null>(null)
	const [selectedToDelete, setSelectedToDelete] = useState<secretKey | null>(null)

	// Handlers para diálogos
	const handleOpenUpdateDialog = (secretKey: secretKey) => setSelectedToUpdate(secretKey)
	const handleCloseUpdateDialog = () => setSelectedToUpdate(null)
	const handleOpenDeleteDialog = (secretKey: secretKey) => setSelectedToDelete(secretKey)
	const handleCloseDeleteDialog = () => setSelectedToDelete(null)

	// Cuando no hay datos
	if (secretKeyData === null && !debouncedSearch && !loadingSecretKey) return <EmptyState />

	return (
		<main className='space-y-4'>
			<SecretKeyHeader totalRecords={secretKeyData?.meta?.pagination?.totalRecords} onSuccess={reFetchSecretKey} />

			<SecretKeyFilters
				search={search}
				setSearch={setSearch}
				startDate={startDate}
				endDate={endDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				setPage={setPage}
			/>

			<SecretKeyPagination
				currentPage={secretKeyData?.meta?.pagination?.currentPage}
				totalPages={secretKeyData?.meta?.pagination?.totalPages}
				totalRecords={secretKeyData?.meta?.pagination?.totalRecords}
				page={page}
				setPage={setPage}
				limit={limit}
				setLimit={setLimit}
				loading={loadingSecretKey}
			/>

			{!loadingSecretKey && secretKeyData?.data?.length === 0 ? (
				<div className='flex flex-col items-center justify-center pt-10'>
					<UtilBanner
						icon={LucideInfo}
						title={debouncedSearch ? 'No se encontraron coincidencias' : 'No hay secret keys registradas'}
						description={
							debouncedSearch
								? `No hay resultados para "${debouncedSearch}"`
								: 'No hay registros disponibles actualmente'
						}
					/>
				</div>
			) : (
				<SecretKeyTable
					secretKeys={secretKeyData}
					isLoading={loadingSecretKey}
					onUpdate={handleOpenUpdateDialog}
					onDelete={handleOpenDeleteDialog}
				/>
			)}

			{selectedToUpdate && (
				<UpdateDialog secretKey={selectedToUpdate} onClose={handleCloseUpdateDialog} onSuccess={reFetchSecretKey} />
			)}

			{selectedToDelete && (
				<DeleteDialog secretKey={selectedToDelete} onClose={handleCloseDeleteDialog} onSuccess={reFetchSecretKey} />
			)}
		</main>
	)
}
