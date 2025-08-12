export interface AuthResponse {
	success: boolean
	statusCode: number
	message: string
	data: {
		accessToken: string
		expiresIn: number
	}
}

export interface UserStatusResponse {
	success: boolean
	statusCode: number
	message: string
	data: {
		userId: string
		iat: number
		exp: number
	}
}

export interface User {
	id: string
	email: string
	name: string
}

export interface AuthContextType {
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	error: string | null
	login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
	logout: () => void
	clearError: () => void
	verifyToken: (token: string) => Promise<void>
}
