import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTE_PATH } from './common/constants/routes'

// Configuración centralizada de rutas
const protectedRoutes = [ROUTE_PATH.ADMIN.DASHBOARD] // Agrega aquí todas las rutas protegidas
const publicRoutes = [ROUTE_PATH.AUTH.SIGNIN, ROUTE_PATH.HOME]

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
	const isPublicRoute = publicRoutes.includes(pathname)

	// Verificar el token de acceso
	const token = request.cookies.get('accessToken')?.value

	// Redirigir usuarios autenticados que intentan acceder a rutas públicas
	if (isPublicRoute && token) {
		return NextResponse.redirect(new URL(ROUTE_PATH.ADMIN.DASHBOARD, request.url))
	}

	// Redirigir usuarios no autenticados que intentan acceder a rutas protegidas
	if (isProtectedRoute && !token) {
		const loginUrl = new URL(ROUTE_PATH.AUTH.SIGNIN, request.url)
		loginUrl.searchParams.set('redirect', pathname)
		return NextResponse.redirect(loginUrl)
	}

	return NextResponse.next()
}

// Configuración para excluir ciertas rutas del middleware
export const config = {
	matcher: [
		/*
		 * Match all request paths except for:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - api routes
		 * - static assets (e.g., .png, .jpg, etc.)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
