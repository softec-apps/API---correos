'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export function Navbar() {
	const { data: session } = useSession()

	return (
		<header>
			<div>Emitto</div>
			{session ? (
				<div className='flex items-center gap-4'>
					<span>Hola, {session.user?.name}</span>
					<button onClick={() => signOut()} className='text-sm text-blue-600'>
						Cerrar sesión
					</button>
				</div>
			) : (
				<button onClick={() => signIn()} className='text-sm text-blue-600'>
					Iniciar sesión
				</button>
			)}
		</header>
	)
}
