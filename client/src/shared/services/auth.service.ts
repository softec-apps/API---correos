import { AuthResponse, User, UserStatusResponse } from '@/common/types/auth'
import api from '@/lib/axios'

export async function signIn(email: string, password: string): Promise<AuthResponse> {
	try {
		const { data } = await api.post<AuthResponse>('/auth/signin', { email, password })
		return data
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
	}
}

export function setAuthToken(token: string): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('accessToken', token)
		// También establecemos la cookie para SSR
		document.cookie = `accessToken=${token}; Path=/; Secure; SameSite=Strict; max-age=3600`
	}
}

export function getAuthToken(): string | null {
	if (typeof window !== 'undefined') return localStorage.getItem('accessToken')
	return null
}

export function clearAuthToken(): void {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('accessToken')
		// Eliminar la cookie estableciendo una fecha de expiración en el pasado
		document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	}
}

export async function verifyToken(token: string): Promise<User> {
	try {
		const { data } = await api.get<UserStatusResponse>('/auth/status', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (!data.success) throw new Error(data.message || 'Token inválido')
		return {
			id: data.data.userId,
			email: data.data.email || '', // asigna si lo tienes
			name: data.data.name || '',
		}
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Token inválido')
	}
}

// Función para cerrar sesión en el servidor y cliente
export async function logout(): Promise<void> {
	try {
		// Primero hacemos la petición al endpoint de logout
		const token = getAuthToken()
		if (token) {
			await api.post(
				'/auth/logout',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
		}

		// Luego limpiamos el estado local y notificamos a otras pestañas
		clearAuthToken() // Limpia localStorage y elimina la cookie
		notifyLogout() // Notifica a otras pestañas
	} catch (error) {
		console.error('Error during logout:', error)
		// Incluso si hay error en el servidor, limpiamos el estado local
		clearAuthToken()
		notifyLogout()
	}
}

// Función para notificar logout a otras pestañas
export function notifyLogout(): void {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('logout', Date.now().toString())
		// Disparamos evento de storage para que otras pestañas lo detecten
		window.dispatchEvent(new Event('storage'))
	}
}

// Función para configurar un listener de logout entre pestañas
export function setupLogoutListener(callback: () => void): () => void {
	if (typeof window === 'undefined') return () => {}

	const handleStorageEvent = (event: StorageEvent) => {
		if (event.key === 'logout') {
			callback()
		}
	}

	window.addEventListener('storage', handleStorageEvent)
	return () => window.removeEventListener('storage', handleStorageEvent)
}
