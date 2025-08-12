import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { secretKey } from '@/common/types/secretKey'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { formatISODateWithMoment } from '@/common/utils/date-formater'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


interface TableProps {
	isLoading: boolean
	secretKeys: {
		data: secretKey[]
	}
	onUpdate: (secretKey: secretKey) => void
	onDelete: (secretKey: secretKey) => void
}

export function SecretKeyTable({ isLoading, secretKeys, onUpdate, onDelete }: TableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow className='border-transparent hover:bg-transparent'>
					<TableHead className='text-muted-foreground'>Nombre</TableHead>
					<TableHead className='text-muted-foreground'>Clave</TableHead>
					<TableHead className='text-muted-foreground'>Estado</TableHead>
					<TableHead className='text-muted-foreground'>Información</TableHead>
					<TableHead className='text-muted-foreground'>Acciones</TableHead>
				</TableRow>
			</TableHeader>

			{isLoading ? (
				<TableSkeleton />
			) : (
				<TableBody className='divide-transparent'>
					{secretKeys?.data?.map(data => (
						<TableRow key={data?._id} className='text-secondary-foreground/80 hover:bg-card/40'>
							<TableCell className='font-medium'>{data?.name}</TableCell>

							<TableCell>{data?.secret_key}</TableCell>

							<TableCell>
								<Badge
									variant='outline'
									className={
										data?.isActive ? 'border-none bg-none p-0 text-emerald-400' : 'border-none bg-none p-0 text-red-400'
									}>
									{data?.isActive ? 'Activo' : 'Inactivo'}
								</Badge>
							</TableCell>

							<TableCell className='text-muted-foreground flex flex-col gap-1'>
								<span>Creado: {formatISODateWithMoment(data?.createdAt)}</span>
								<span>Actualizado: {formatISODateWithMoment(data?.updatedAt)}</span>
							</TableCell>

							<TableCell>
								<button
									onClick={() => onUpdate(data)}
									className='cursor-pointer rounded-lg p-1.5 transition-all duration-300 hover:bg-cyan-100/10 hover:text-cyan-500'>
									<BiEditAlt className='size-4' />
								</button>

								<button
									onClick={() => onDelete(data)}
									className='hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg p-1.5 transition-all duration-300'>
									<BiTrashAlt className='size-4' />
								</button>
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
							<Skeleton className='bg-muted h-5 w-auto px-20' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-full px-60' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto' />
						</TableCell>
						<TableCell>
							<Skeleton className='bg-muted h-5 w-auto px-20' />
						</TableCell>
						<TableCell className='flex items-center gap-2'>
							<Skeleton className='bg-muted h-6 w-6 rounded' />
							<Skeleton className='bg-muted h-6 w-6 rounded' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	)
}
