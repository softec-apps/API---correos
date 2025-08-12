'use client'

import { Button } from '@/components/ui/button'
import {
	FileUpload,
	FileUploadList,
	FileUploadItem,
	FileUploadDropzone,
	FileUploadItemDelete,
	FileUploadItemPreview,
	FileUploadItemMetadata,
} from '@/components/ui/file-upload'
import { LucideCloudUpload, LucideX } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { Typography } from '@/components/ui/typography'

interface FileUploadDemoProps {
	onValueChange: (files: File[]) => void
	maxFiles?: number
	maxSize?: number // en MB
	defaultImageUrl?: string
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'text/xml', 'image/jpg']

export function FileUploadDemo({ onValueChange, maxFiles = 1, maxSize = 5, defaultImageUrl }: FileUploadDemoProps) {
	const [files, setFiles] = React.useState<File[]>([])

	const onFileReject = React.useCallback((file: File, message: string) => {
		toast(message, {
			description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" ha sido rechazado`,
		})
	}, [])

	const handleValueChange = (newFiles: File[]) => {
		const validFiles = newFiles.filter(file => {
			if (!ALLOWED_TYPES.includes(file.type)) {
				onFileReject(file, 'Tipo de archivo no permitido')
				return false
			}
			return true
		})

		const limitedFiles = validFiles.slice(0, maxFiles)

		setFiles(limitedFiles)
		onValueChange(limitedFiles)
	}

	// Mostrar dropzone solo si no hay archivos seleccionados ni imagen por defecto
	const shouldShowDropzone = files.length < maxFiles && !defaultImageUrl

	return (
		<FileUpload
			maxFiles={maxFiles}
			maxSize={maxSize * 1024 * 1024}
			className='w-full'
			value={files}
			onValueChange={handleValueChange}
			onFileReject={onFileReject}
			multiple={maxFiles > 1}>
			{shouldShowDropzone && (
				<FileUploadDropzone className='hover:bg-muted cursor-pointer'>
					<div className='flex flex-col items-center gap-4'>
						<div className='flex items-center justify-center rounded-full border p-3'>
							<LucideCloudUpload className='text-primary' />
						</div>
						<div className='flex flex-col items-center'>
							<Typography variant='p'>Arrastra o busca tu archivo aquí</Typography>
							<Typography variant='muted'>
								PNG · JPG · JPEG · PDF · XML (máx. {maxFiles} archivo{maxFiles > 1 ? 's' : ''}, hasta {maxSize} MB)
							</Typography>
						</div>
					</div>
				</FileUploadDropzone>
			)}

			<FileUploadList>
				{files.map((file, index) => (
					<FileUploadItem key={`file-${index}`} value={file}>
						<FileUploadItemPreview />
						<FileUploadItemMetadata />
						<FileUploadItemDelete asChild>
							<Button variant='ghost' size='icon' className='size-7 cursor-pointer'>
								<LucideX />
							</Button>
						</FileUploadItemDelete>
					</FileUploadItem>
				))}
			</FileUploadList>
		</FileUpload>
	)
}
