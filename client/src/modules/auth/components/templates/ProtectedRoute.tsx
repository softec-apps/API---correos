'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated)
			router.push('/signIn?callbackUrl=' + encodeURIComponent(window.location.pathname))
	}, [isAuthenticated, isLoading, router])

	if (isLoading || !isAuthenticated) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
			</div>
		)
	}

	return <>{children}</>
}
