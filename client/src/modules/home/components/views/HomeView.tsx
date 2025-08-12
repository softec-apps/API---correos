'use client'

import { HeroTemplate } from '@/modules/home/components/templates/HeroTemplate'
import { DemoSendMail } from '@/modules/home/components/templates/DemoTemplate'
import { FeatureTemplate } from '@/modules/home/components/templates/FeatureTemplate'

export function HomeView() {
	return (
		<div className='from-background to-muted/20 bg-gradient-to-b pb-20'>
			{/* Hero Section */}
			<HeroTemplate />

			{/* Features Section */}
			<FeatureTemplate />

			{/* Demo */}
			<DemoSendMail />
		</div>
	)
}
