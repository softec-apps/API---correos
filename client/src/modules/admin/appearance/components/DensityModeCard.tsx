import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export function DensityModeCard({
	isScaled,
	onScaledChange,
}: {
	isScaled: boolean
	onScaledChange: (checked: boolean) => void
}) {
	return (
		<Card className='border-none'>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle>Modo de alta densidad</CardTitle>
				<Switch
					id='scaled-mode'
					checked={isScaled}
					onCheckedChange={onScaledChange}
					className='data-[state=checked]:bg-primary cursor-pointer'
				/>
			</CardHeader>
			<CardContent>
				<CardDescription>
					Ideal para pantallas pequeñas o cuando necesitas maximizar el espacio. Reduce los paddings y márgenes para
					mostrar más contenido sin sacrificar legibilidad. Perfecto para productividad.
				</CardDescription>
			</CardContent>
		</Card>
	)
}
