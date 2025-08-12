import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Iniciar sesión | Emitto - Envío de correos masivos',
	description:
		'Accede a tu cuenta en Emitto y gestiona fácilmente tus campañas de correo electrónico masivo. Envía, programa y analiza tus envíos de forma eficiente.',
}

export default function TshirtLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
