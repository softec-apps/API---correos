import type { NextConfig } from 'next/types'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'payloadcms.com',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	output: 'standalone',
}
export default nextConfig
