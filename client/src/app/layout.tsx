import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { log } from '@/lib/log'
import { cn } from '@/lib/utils'
import { after } from 'next/server'

import { cookies } from 'next/headers'

import { ThemeProvider } from '@/common/providers/Theme-provider'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthContext'
import { FACTORY_INFO } from '@/common/constants/factory-info'
import { ActiveThemeProvider } from '@/shared/components/active-theme'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: `${FACTORY_INFO.NAME} | ${FACTORY_INFO.DESCRIPTION}`,
	description: `${FACTORY_INFO.SLOGAN}`,
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = cookies()
	const activeThemeValue = (await cookieStore).get('active_theme')?.value
	const isScaled = activeThemeValue?.endsWith('-scaled')

	after(async () => await log())

	return (
		<html lang='es' suppressHydrationWarning>
			<body
				className={cn(
					'flex min-h-screen flex-col font-sans antialiased',
					activeThemeValue ? `theme-${activeThemeValue} ${geistSans.variable} ${geistMono.variable}` : '',
					isScaled ? 'theme-scaled' : ''
				)}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange enableColorScheme>
					<ActiveThemeProvider initialTheme={activeThemeValue}>
						<Toaster position='top-center' />
						<AuthProvider>
							<main>{children}</main>
						</AuthProvider>
					</ActiveThemeProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
