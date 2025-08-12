'use client'

import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type MonitorCardDialogProps = {
	title: string
	src: string
}

export const MonitorCardDialog: React.FC<MonitorCardDialogProps> = ({ title, src }) => {
	const [iframeSrc, setIframeSrc] = useState<string | null>(null)

	return (
		<Dialog onOpenChange={open => !open && setIframeSrc(null)}>
			<DialogTrigger asChild>
				<Card
					onClick={() => setIframeSrc(src)}
					className='hover:bg-secondary cursor-pointer transition-all duration-500'>
					<CardHeader>
						<CardTitle>{title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-muted-foreground text-sm'>Ver monitoreo de {title}</div>
					</CardContent>
				</Card>
			</DialogTrigger>

			<DialogContent
				className='h-screen w-full max-w-full min-w-full overflow-hidden border-none p-0'
				style={{ height: '100vh', overflow: 'auto' }}>
				<div
					style={{
						transform: 'scale(0.9)',
						transformOrigin: 'top left',
						width: '111%',
						height: '111%',
					}}>
					{iframeSrc && <iframe src={iframeSrc} width='100%' height='100%' className='h-full w-full min-w-full' />}
				</div>
			</DialogContent>
		</Dialog>
	)
}
