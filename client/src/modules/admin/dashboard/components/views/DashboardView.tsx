'use client'

import { LucideKeyRound } from 'lucide-react'
import { ChartConsumptionApi } from '../molecules/ChartConsumptionApi'
import { formatNumberAbbreviated } from '@/common/utils/formatNumberCompact'
import { Greeting } from '@/modules/admin/dashboard/components/molecules/Greeting'
import { CardStatistics } from '@/modules/admin/dashboard/components/molecules/cardSummary'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// HOOKS
import { useFindAllSecretKeys } from '@/hooks/useSecretKey'

export function DashboardView() {
	const { secretKey: secretKeyData, loading: loadingSecretKeys, error: errorSecretKeys } = useFindAllSecretKeys()

	const logs = [
		{
			name: 'Juan Pérez',
			email: 'juan.perez@example.com',
			initials: 'JP',
			subject: 'Confirmación de registro',
			sentAt: '2025-05-06T09:15:00Z',
			status: 'sent',
		},
		{
			name: 'María García',
			email: 'maria.garcia@example.com',
			initials: 'MG',
			subject: 'Recuperación de contraseña',
			sentAt: '2025-05-06T10:45:00Z',
			status: 'sent',
		},
		{
			name: 'Luis Rodríguez',
			email: 'luis.rodriguez@example.com',
			initials: 'LR',
			subject: 'Error en el envío',
			sentAt: '2025-05-06T11:30:00Z',
			status: 'failed',
		},
		{
			name: 'Ana Torres',
			email: 'ana.torres@example.com',
			initials: 'AT',
			subject: 'Bienvenida a la plataforma',
			sentAt: '2025-05-06T12:00:00Z',
			status: 'sent',
		},
		{
			name: 'Carlos Mendoza',
			email: 'carlos.mendoza@example.com',
			initials: 'CM',
			subject: 'Actualización de perfil',
			sentAt: '2025-05-06T13:10:00Z',
			status: 'failed',
		},
	]

	return (
		<div className='flex-1 space-y-4'>
			<Greeting />

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<CardStatistics
					value={formatNumberAbbreviated(secretKeyData?.meta?.pagination?.totalRecords)}
					label='Claves'
					singularLabel='Clave'
					loading={loadingSecretKeys}
					error={errorSecretKeys}
					icon={LucideKeyRound}
					iconBgColor='bg-emerald-100 dark:bg-emerald-800/50'
					iconColor='text-emerald-300'
				/>
			</div>

			{/*
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<div className='col-span-4'>
					<ChartConsumptionApi />
				</div>

				<Card className='col-span-3'>
					<CardHeader>
						<CardTitle>Logs de Correos</CardTitle>
						<CardDescription>Historial de correos enviados recientemente.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{logs.map((log, i) => (
								<div key={i} className='flex items-center'>
									<div className='space-y-1'>
										<p className='text-sm leading-none font-medium'>{log.name}</p>
										<p className='text-muted-foreground text-sm'>{log.email}</p>
										<p className='text-xs text-neutral-500'>Asunto: {log.subject}</p>
									</div>
									<div className='ml-auto text-right text-sm'>
										<p className='font-medium'>{new Date(log.sentAt).toLocaleString()}</p>
										<p className={`text-xs ${log.status === 'sent' ? 'text-emerald-600' : 'text-destructive'}`}>
											{log.status === 'sent' ? 'Enviado' : 'Fallido'}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
			*/}
		</div>
	)
}
