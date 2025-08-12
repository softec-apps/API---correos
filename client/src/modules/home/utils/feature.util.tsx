import { BarChart2, Box, Send, ShieldCheck } from 'lucide-react'

export const features = [
	{
		icon: <Send className='h-5 w-5' />,
		title: 'Envíos rápidos',
		description: 'Entrega de correos en segundos a cualquier destino',
	},
	{
		icon: <ShieldCheck className='h-5 w-5' />,
		title: 'Seguridad garantizada',
		description: 'Cifrado de extremo a extremo para todos tus mensajes',
	},
	{
		icon: <BarChart2 className='h-5 w-5' />,
		title: 'Analíticas avanzadas',
		description: 'Seguimiento detallado de cada envío',
	},
]
