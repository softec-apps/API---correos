'use client'
import { useRouter } from 'next/navigation'
import { User, AuthContextType } from '@/common/types/auth'
import * as authService from '@/shared/services/auth.service'
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Verificar token al cargar
	const verifyToken = useCallback(async (token: string) => {
		try {
			const userData = await authService.verifyToken(token)
			setUser(userData)
			setError(null)
		} catch (err) {
			console.error('Token verification failed:', err)
			handleLogout()
		}
	}, [])

	// Efecto para verificar autenticación al montar el componente
	useEffect(() => {
		const token = authService.getAuthToken()
		if (token) {
			verifyToken(token).finally(() => setIsLoading(false))
		} else {
			setIsLoading(false)
		}

		// Configurar listener de logout entre pestañas
		const unsubscribe = authService.setupLogoutListener(() => {
			setUser(null)
			router.push('/')
		})

		return () => unsubscribe()
	}, [verifyToken, router])

	// Función de login
	const login = async (email: string, password: string) => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await authService.signIn(email, password)
			authService.setAuthToken(response.data.accessToken)
			await verifyToken(response.data.accessToken)
			return { success: true }
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
			setError(errorMessage)
			return { success: false, error: errorMessage }
		} finally {
			setIsLoading(false)
		}
	}

	// Función de logout
	const handleLogout = useCallback(async () => {
		try {
			await authService.logout() // Esta función ya maneja la limpieza del token
			setUser(null)
			router.push('/')
		} catch (error) {
			console.error('Error during logout:', error)
			// En caso de error, forzamos la limpieza manual
			authService.clearAuthToken()
			setUser(null)
			router.push('/')
		}
	}, [router])

	// Limpiar errores
	const clearError = () => setError(null)

	// Valor del contexto
	const contextValue: AuthContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		error,
		login,
		logout: handleLogout,
		clearError,
		verifyToken: (token: string) => verifyToken(token),
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')
	return context
}
