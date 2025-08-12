'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { SpinnerLoader } from './SpinnerLoader'
import { ROUTE_PATH } from '@/common/constants/routes'

interface UnauthenticatedRouteProps {
	children: ReactNode
	redirectTo?: string
}

export function UnauthenticatedRoute({ children, redirectTo = ROUTE_PATH.ADMIN.DASHBOARD }: UnauthenticatedRouteProps) {
	const router = useRouter()
	const { isAuthenticated, isLoading } = useAuth()

	useEffect(() => {
		if (!isLoading && isAuthenticated) router.push(redirectTo)
	}, [isAuthenticated, isLoading, router, redirectTo])

	if (isLoading || isAuthenticated) {
		return (
			<div className='flex h-screen flex-col items-center justify-center space-y-2'>
				<SpinnerLoader text='Cargando, por favor espera un momento...' />
			</div>
		)
	}

	return <>{children}</>
}
