import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

export const DynamicBreadcrumb = () => {
	const pathname = usePathname()

	// Dividir la ruta en segmentos
	const segments = pathname.split('/').filter(segment => segment !== '')

	// Construir las migas de pan
	const breadcrumbs = segments.map((segment, index) => {
		const href = '/' + segments.slice(0, index + 1).join('/')
		const isLast = index === segments.length - 1
		const formattedSegment = segment
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')

		return (
			<BreadcrumbItem key={href} className={index > 0 ? 'hidden md:block' : ''}>
				{isLast ? (
					<BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
				) : (
					<BreadcrumbLink href={href}>{formattedSegment}</BreadcrumbLink>
				)}
				{!isLast && <BreadcrumbSeparator className='hidden md:block' />}
			</BreadcrumbItem>
		)
	})

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{segments.length > 0 && <BreadcrumbSeparator className='hidden md:block' />}
				{breadcrumbs}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
