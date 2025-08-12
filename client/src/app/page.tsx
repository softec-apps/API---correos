'use client'

import { HeaderPublic } from '@/shared/components/HeaderPublic'
import { FooterPublic } from '@/shared/components/Footer-public'
import { HomeView } from '@/modules/home/components/views/HomeView'

export default function LandingPage() {
	return (
		<>
			<HeaderPublic />
			<HomeView />
			<FooterPublic />
		</>
	)
}
