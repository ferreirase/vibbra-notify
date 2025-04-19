import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmailNotificationDto {
  @ApiProperty({ description: 'ID do aplicativo' })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({ description: 'Email do destinatário' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Assunto do email' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'ID do template de email' })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({
    description: 'Dados para preencher o template',
    example: { name: 'João', url: 'https://exemplo.com' },
  })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
