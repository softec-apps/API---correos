'use client'

import api from '@/lib/axios'
import { useEffect } from 'react'
import { useFindAll } from '@/hooks/useUser'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { UtilBanner } from '@/shared/components/UtilBanner'
import { LucideArchiveX, LucideServer } from 'lucide-react'
import { UserTable } from '@/modules/admin/user/components/organisms/userTable'

export function UserView() {
	const { user: usersData = [], loading: loadingUsers, error: errorUsers } = useFindAll()

	if (errorUsers) {
		return (
			<div className='flex h-screen flex-col items-center justify-center space-y-2'>
				<UtilBanner
					icon={LucideServer}
					title='Error 500'
					description='Hubo un problema en el servidor. Por favor, inténtalo de nuevo más tarde.'
				/>
			</div>
		)
	}

	if (usersData?.pagination?.totalRecord === 0) {
		return (
			<div className='flex h-screen flex-col items-center justify-center'>
				<UtilBanner
					icon={LucideArchiveX}
					title='No se encontraron usuarios'
					description='Aún no hay usuarios registrados en el sistema.'
				/>
			</div>
		)
	}

	return (
		<main className='space-y-4'>
			<div className='flex items-center justify-between'>
				<Typography variant='h3'>Usuarios</Typography>
				<Button size='xs' className='bg-primary hover:bg-primary-dark'>
					Nuevo usuario
				</Button>
			</div>

			<div className='bg-muted/60 flex items-center justify-between rounded-md p-1 px-2'>
				<Typography variant='span' className='text-muted-foreground text-xs'>
					Mostrando {usersData?.meta?.pagination?.perPage} - {usersData?.meta?.pagination?.totalRecords} resultados
				</Typography>

				<div className='flex items-center gap-2'>
					<Label htmlFor='limit' className='text-muted-foreground text-xs'>
						Resultados por página
					</Label>
					<select id='limit' className='text-muted-foreground bg-background rounded-md border px-2 py-1 text-sm'>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
					</select>
				</div>
			</div>

			<UserTable users={usersData} isLoading={loadingUsers} />
		</main>
	)
}
