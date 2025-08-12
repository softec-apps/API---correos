'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, useEffect, useState } from 'react'
import { ROUTE_PATH } from '@/common/constants/routes'

const Page404 = () => {
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

	return (
		<div className='bg-background relative flex h-screen items-center justify-center overflow-hidden'>
			{/* Canvas con posición fija y z-index bajo */}
			<canvas ref={canvasRef} className='pointer-events-none fixed inset-0 -z-0 opacity-0 sm:opacity-50' />

			{/* Contenedor principal con z-index alto */}
			<motion.div
				variants={container}
				initial='hidden'
				animate='visible'
				className='relative z-10 w-full max-w-xs px-4 text-center'>
				{/* Número 404 */}
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
						404
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
					<h2 className='text-foreground text-base font-medium sm:text-lg'>Recurso no encontrado</h2>
					<p className='text-foreground/60 text-xs sm:text-sm'>El contenido que buscas no existe o fue movido</p>
				</motion.div>

				{/* Botones con pointer-events auto */}
				<motion.div variants={item} className='mt-6 flex flex-col space-y-2 sm:mt-8 sm:space-y-3'>
					<Button
						onClick={goBack}
						variant='ghost'
						size='sm'
						className='group border-foreground/10 bg-background/50 hover:bg-foreground/5 pointer-events-auto w-full cursor-pointer justify-center gap-1.5 border text-sm backdrop-blur-sm'>
						<ArrowLeft size={14} className='opacity-60' />
						<span>Volver atrás</span>
					</Button>

					<Link href={ROUTE_PATH.HOME} className='pointer-events-auto block'>
						<Button
							size='sm'
							className='bg-foreground text-background hover:bg-foreground/90 w-full cursor-pointer text-sm'>
							Ir al inicio
						</Button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default Page404
