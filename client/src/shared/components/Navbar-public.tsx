import Link from 'next/link'

export const NavbarPublic = () => {
	return (
		<nav className='hidden gap-6 md:flex'>
			<Link
				href='#features'
				className='text-muted-foreground hover:text-foreground p-1 text-sm font-medium tracking-wide transition-all duration-300'>
				Características
			</Link>

			<Link
				href='#testimonials'
				className='text-muted-foreground hover:text-foreground p-1 text-sm font-medium tracking-wide transition-all duration-300'>
				Testimonios
			</Link>

			<Link
				href='#pricing'
				className='text-muted-foreground hover:text-foreground p-1 text-sm font-medium tracking-wide transition-all duration-300'>
				Precios
			</Link>

			<Link
				href='#faq'
				className='text-muted-foreground hover:text-foreground p-1 text-sm font-medium tracking-wide transition-all duration-300'>
				FAQ
			</Link>
		</nav>
	)
}
