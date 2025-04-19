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
  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({
    description: 'Email do destinatário',
    example: 'cliente@exemplo.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Assunto do email',
    example: 'Confirmação de cadastro',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'ID do template de email',
    example: '550e8400-e29b-41d4-a716-446655440001',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({
    description: 'Dados para preencher o template',
    example: {
      name: 'João Silva',
      link: 'https://aplicativo.com/confirm?token=abc123',
      products: [
        { name: 'Produto 1', price: 'R$ 99,90' },
        { name: 'Produto 2', price: 'R$ 149,90' },
      ],
      total: 'R$ 249,80',
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
