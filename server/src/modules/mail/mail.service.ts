import { Queue } from 'bull'
import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { SendEmailDto } from '@/modules/mail/dto/send-email.dto'
import * as path from 'path'
import * as fs from 'fs'
import { ConfigService } from '@nestjs/config'
import { AttachmentDto } from '@/modules/mail/dto/send-email.dto'

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('emailQueue')
    private emailQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async storeFile(file: Express.Multer.File): Promise<AttachmentDto> {
    const uploadDir = this.configService.get('UPLOAD_DIR') || 'uploads'
    const fileName = `${Date.now()}_${file.originalname}`
    const filePath = path.join(uploadDir, fileName)

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    fs.writeFileSync(filePath, file.buffer)

    return {
      filename: file.originalname,
      path: filePath,
    }
  }

  async sendEmail(body: SendEmailDto) {
    const senderNameDefault = this.configService.get('MAIL_FROM')
    const fromName = body.from || senderNameDefault
    const fromEmail = this.configService.get('MAIL_USER')

    const from = `"${fromName}" <${fromEmail}>`

    const emailData = {
      ...body,
      from: from,
    }

    await this.emailQueue.add('sendEmail', emailData)
    return { success: true, message: 'Correo encolado' }
  }
}
