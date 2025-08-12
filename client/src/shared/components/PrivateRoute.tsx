'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { SpinnerLoader } from './SpinnerLoader'
import { ROUTE_PATH } from '@/common/constants/routes'

interface PrivateRouteProps {
	children: ReactNode
	redirectTo?: string
	requiredRoles?: string[]
}

export function PrivateRoute({ children, redirectTo = ROUTE_PATH.AUTH.SIGNIN, requiredRoles = [] }: PrivateRouteProps) {
	const router = useRouter()
	const { user, isLoading, isAuthenticated } = useAuth()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			const url = new URL(redirectTo, window.location.origin)
			url.searchParams.set('redirect', window.location.pathname)
			router.push(url.toString())
		}
	}, [isAuthenticated, isLoading, router, redirectTo])

	if (isLoading) {
		return (
			<div className='flex h-screen flex-col items-center justify-center'>
				<SpinnerLoader />
			</div>
		)
	}

	if (!isAuthenticated) return null // Ya se maneja la redirección en el efecto

	/*
	// Verificación de roles si es necesario
	if (requiredRoles.length > 0 && user?.role && !requiredRoles.includes(user.role)) {
		return (
			<div className='flex h-screen flex-col items-center justify-center'>
				<p>No tienes permisos para acceder a esta página</p>
			</div>
		)
	}
    */

	return <>{children}</>
}
