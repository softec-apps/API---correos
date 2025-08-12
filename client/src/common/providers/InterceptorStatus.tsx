'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { emitter } from '@/common/utils/eventEmitter'
import { ROUTE_PATH } from '@/common/constants/routes'

export function GlobalErrorHandler({ children }: { children: React.ReactNode }) {
	const [errorState, setErrorState] = useState<{ type: string; message?: string } | null>(null)

	const [isMobile, setIsMobile] = useState(false)

	const goBack = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		window.history.length > 1 ? window.history.back() : (window.location.href = ROUTE_PATH.HOME)
	}

	// Animaciones simplificadas
	const container = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.03 },
		},
	}

	const item = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: 'spring', stiffness: 120 },
		},
	}

	// Efecto de partículas optimizado
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		// Detectar si es móvil
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768 || window.devicePixelRatio > 1)
		}
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Ajustar canvas según el zoom
		const adjustCanvas = () => {
			const pixelRatio = window.devicePixelRatio || 1
			canvas.width = window.innerWidth * pixelRatio
			canvas.height = window.innerHeight * pixelRatio
			canvas.style.width = `${window.innerWidth}px`
			canvas.style.height = `${window.innerHeight}px`
			ctx.scale(pixelRatio, pixelRatio)
		}
		adjustCanvas()

		const particles: Particle[] = []
		const particleCount = isMobile ? 15 : 30

		class Particle {
			x: number
			y: number
			size: number
			speedX: number
			speedY: number
			color: string

			constructor() {
				this.x = Math.random() * window.innerWidth
				this.y = Math.random() * window.innerHeight
				this.size = Math.random() * 3 + 0.5
				this.speedX = Math.random() * 0.8 - 0.4
				this.speedY = Math.random() * 0.8 - 0.4
				this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
			}

			update() {
				this.x += this.speedX
				this.y += this.speedY

				if (this.x > window.innerWidth || this.x < 0) this.speedX *= -1
				if (this.y > window.innerHeight || this.y < 0) this.speedY *= -1
			}

			draw() {
				if (!ctx) return
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
				ctx.fillStyle = this.color
				ctx.fill()
			}
		}

		for (let i = 0; i < particleCount; i++) particles.push(new Particle())

		let animationId: number
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			for (let i = 0; i < particles.length; i++) {
				particles[i].update()
				particles[i].draw()
			}
			animationId = requestAnimationFrame(animate)
		}

		animate()

		const handleResize = () => {
			adjustCanvas()
			checkIfMobile()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			cancelAnimationFrame(animationId)
		}
	}, [isMobile])

	useEffect(() => {
		const on401 = () => setErrorState({ type: '401' })
		const on403 = () => setErrorState({ type: '403' })
		const on500 = (msg: string) => setErrorState({ type: '500', message: msg })

		emitter.on('unauthorized', on401)
		emitter.on('forbidden', on403)
		emitter.on('serverError', on500)

		return () => {
			emitter.off('unauthorized', on401)
			emitter.off('forbidden', on403)
			emitter.off('serverError', on500)
		}
	}, [])

	if (errorState) {
		let code = ''
		let title = ''
		let description = ''
		let showReload = false

		switch (errorState.type) {
			case '401':
				code = '401'
				title = 'Sesión expirada'
				description = 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.'
				break
			case '403':
				code = '403'
				title = 'Acceso denegado'
				description = 'No tienes permisos para acceder a esta sección.'
				break
			case '500':
				code = '500'
				title = 'Error del servidor'
				description = errorState.message || 'Ha ocurrido un error inesperado en el servidor.'
				showReload = true
				break
		}

		return (
			<>
				<div className='relative flex h-screen items-center justify-center overflow-hidden'>
					<canvas ref={canvasRef} className='pointer-events-none fixed inset-0 -z-0 opacity-0 sm:opacity-50' />

					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='relative z-10 w-full max-w-xs px-4 text-center'>
						{/* Código de error */}
						<motion.div variants={item} className='relative'>
							<motion.span
								className='text-foreground/90 block text-7xl font-light tracking-tighter sm:text-8xl'
								animate={{
									textShadow: '0 0 5px rgba(255,255,255,0.2)',
									transition: {
										duration: 3,
										repeat: Infinity,
										repeatType: 'reverse',
									},
								}}>
								{code}
							</motion.span>
						</motion.div>

						{/* Divisor */}
						<motion.div
							variants={item}
							className='pt-4 sm:pt-6'
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: 1,
								transition: { delay: 0.3, type: 'spring', stiffness: 80 },
							}}>
							<div className='via-foreground/15 h-px w-full bg-gradient-to-r from-transparent to-transparent' />
						</motion.div>

						{/* Mensaje */}
						<motion.div variants={item} className='mt-4 space-y-1 sm:mt-6'>
							<h2 className='text-foreground text-base font-medium sm:text-lg'>{title}</h2>
							<p className='text-foreground/60 text-xs sm:text-sm'>{description}</p>
						</motion.div>

						{/* Botones */}
						<motion.div variants={item} className='mt-6 flex flex-col space-y-2 sm:mt-8 sm:space-y-3'>
							{showReload ? (
								<>
									<Button onClick={goBack} size='sm' variant='ghost'>
										<ArrowLeft size={14} className='mr-2' />
										<span>Volver atrás</span>
									</Button>

									<Button onClick={() => window.location.reload()} size='sm'>
										<RefreshCw size={14} className='mr-2' />
										<span>Reintentar</span>
									</Button>
								</>
							) : (
								<Button onClick={goBack} size='sm'>
									<ArrowLeft size={14} className='mr-2' />
									<span>Volver atrás</span>
								</Button>
							)}
						</motion.div>
					</motion.div>
				</div>
			</>
		)
	}

	return <>{children}</>
}
