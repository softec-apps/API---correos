import axios from 'axios'
import { emitter } from '@/common/utils/eventEmitter'
import { getAuthToken } from '@/shared/services/auth.service'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL_API,
	withCredentials: true,
})

api.interceptors.request.use(config => {
	const token = getAuthToken()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

api.interceptors.response.use(
	response => response,
	error => {
		const status = error.response?.status
		const message = error.response?.data?.message || error.message

		if (status === 401) emitter.emit('unauthorized')
		if (status === 403) emitter.emit('forbidden')
		if (status === 500) emitter.emit('serverError', message)

		return Promise.reject(error)
	}
)

export default api
