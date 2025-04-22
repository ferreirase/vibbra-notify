import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateWebPushNotificationDto {
  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({
    description: 'ID do destinatário (opcional)',
    example: 'user-123',
    required: false,
  })
  @IsString()
  @IsOptional()
  targetId?: string;

  @ApiProperty({
    description: 'Título da notificação',
    example: 'Nova promoção disponível!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Mensagem da notificação',
    example: 'Aproveite os descontos de até 50% em produtos selecionados.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'URL do ícone (opcional)',
    example: 'https://meu-ecommerce.com/icon.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({
    description: 'URL de redirecionamento ao clicar (opcional)',
    example: 'https://meu-ecommerce.com/promocoes',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkUrl?: string;
}
