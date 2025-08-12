'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { ROUTE_PATH } from '@/common/constants/routes'

export function useAuthRedirect(requireAuth: boolean, redirectTo: string = ROUTE_PATH.AUTH.SIGNIN) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			if (requireAuth && !isAuthenticated) {
				router.push(`${redirectTo}?redirect=${window.location.pathname}`)
			} else if (!requireAuth && isAuthenticated) {
				router.push(redirectTo)
			}
		}
	}, [isAuthenticated, isLoading, requireAuth, redirectTo, router])
}
