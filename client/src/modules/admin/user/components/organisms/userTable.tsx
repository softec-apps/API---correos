import { formatISODateWithMoment } from '@/common/utils/date-formater'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge' // Asumiendo que tienes un componente Badge
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LucideEdit, LucideEllipsisVertical, LucideTrash } from 'lucide-react'

interface User {
	_id: string
	name: string
	email: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

interface UserTableProps {
	isLoading: boolean
	users: {
		data: User[]
	}
}

export function UserTable({ isLoading, users }: UserTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow className='text-xs hover:bg-transparent'>
					<TableHead>Nombre</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead>Acciones</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>

			{isLoading ? (
				<TableSkeleton />
			) : (
				<TableBody className='text-xs'>
					{users?.data?.map(user => (
						<TableRow key={user?._id}>
							<TableCell className='font-medium'>{user?.name}</TableCell>

							<TableCell>{user?.email}</TableCell>

							<TableCell>
								<Badge
									variant='outline'
									className={user?.isActive ? 'bg-none text-emerald-400' : 'bg-none text-red-400'}>
									{user?.isActive ? 'Activo' : 'Inactivo'}
								</Badge>
							</TableCell>

							<TableCell className='text-muted-foreground flex flex-col gap-1'>
								<span>Creado: {formatISODateWithMoment(user?.createdAt)}</span>
								<span>Actualizado: {formatISODateWithMoment(user?.updatedAt)}</span>
							</TableCell>

							<TableCell className='space-x-2'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='ghost' className='h-6 w-7 cursor-pointer'>
											<LucideEllipsisVertical />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent align='end'>
										<DropdownMenuItem className='cursor-pointer'>
											<LucideEdit className='mr-2 h-4 w-4' />
											Editar
										</DropdownMenuItem>

										<DropdownMenuItem className='text-destructive cursor-pointer'>
											<LucideTrash className='mr-2 h-4 w-4' />
											Eliminar
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			)}
		</Table>
	)
}

export const TableSkeleton = () => {
	return (
		<>
			<TableBody>
				{Array.from({ length: 10 }).map((_, index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-6 w-6 rounded' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	)
}
