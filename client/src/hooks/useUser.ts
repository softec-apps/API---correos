'use client'

import axios from 'axios'
import api from '@/lib/axios'
import { useState, useEffect } from 'react'

export function useFindAll() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await api.get('/user')
				setUser(response.data)
			} catch (err) {
				if (axios.isAxiosError(err)) {
					if (err.response?.status === 401) {
						setError('Authentication required. Please log in.')
					} else {
						setError(err.response?.data?.message || err.message)
					}
				} else {
					setError('An unknown error occurred')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	return { user, loading, error }
}
