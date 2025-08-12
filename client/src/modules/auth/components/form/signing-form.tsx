'use client'

import type React from 'react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routes'

export function SigningForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
	const router = useRouter()
	const { login } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleCredentialsLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const result = await login(email, password)
			if (!result.success) throw new Error(result.error)
			router.push(ROUTE_PATH.ADMIN.DASHBOARD)
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Error desconocido')
		} finally {
			setIsLoading(false)
		}
	}

	const isDisabled = isLoading || !email || !password

	return (
		<div className={cn('flex flex-col gap-6', className)}>
			<form onSubmit={handleCredentialsLogin} className='space-y-4' {...props}>
				<div className='space-y-2'>
					<Label htmlFor='email'>Email</Label>
					<Input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
				</div>

				<div className='space-y-2'>
					<Label htmlFor='password'>Contraseña</Label>
					<Input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
				</div>

				<Button type='submit' className='flex w-full items-center justify-center gap-2' disabled={isDisabled}>
					{isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
					{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
				</Button>
			</form>
		</div>
	)
}
