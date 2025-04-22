import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { NotificationChannel } from '../../domain/entities/application.entity';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Nome do aplicativo',
    example: 'Meu E-commerce',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descrição do aplicativo',
    example: 'E-commerce de produtos eletrônicos',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Canais de notificação habilitados',
    example: [NotificationChannel.WEB_PUSH, NotificationChannel.EMAIL],
    enum: NotificationChannel,
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels: NotificationChannel[];

  // Web Push Configuration
  @ApiProperty({
    description: 'Nome do site para Web Push',
    example: 'Meu E-commerce',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushSiteName?: string;

  @ApiProperty({
    description: 'URL do site para Web Push',
    example: 'https://meu-ecommerce.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  webPushSiteUrl?: string;

  @ApiProperty({
    description: 'URL do ícone para Web Push',
    example: 'https://meu-ecommerce.com/icon.png',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  webPushIconUrl?: string;

  @ApiProperty({
    description: 'Texto de solicitação de permissão para Web Push',
    example: 'Deseja receber notificações de novas promoções?',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushPermissionText?: string;

  @ApiProperty({
    description: 'Texto do botão Permitir para Web Push',
    example: 'Sim, quero receber',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushAllowButtonText?: string;

  @ApiProperty({
    description: 'Texto do botão Negar para Web Push',
    example: 'Agora não',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushDenyButtonText?: string;

  @ApiProperty({
    description: 'Título da mensagem de boas-vindas para Web Push',
    example: 'Bem-vindo ao Meu E-commerce!',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushWelcomeTitle?: string;

  @ApiProperty({
    description: 'Texto da mensagem de boas-vindas para Web Push',
    example:
      'Obrigado por ativar as notificações. Você receberá atualizações sobre promoções e novidades.',
    required: false,
  })
  @IsOptional()
  @IsString()
  webPushWelcomeMessage?: string;

  @ApiProperty({
    description:
      'URL de redirecionamento da mensagem de boas-vindas para Web Push',
    example: 'https://meu-ecommerce.com/promocoes',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  webPushWelcomeUrl?: string;

  // Email Configuration
  @ApiProperty({
    description: 'Servidor SMTP para envio de emails',
    example: 'smtp.gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  emailSmtpHost?: string;

  @ApiProperty({
    description: 'Porta do servidor SMTP',
    example: 587,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  emailSmtpPort?: number;

  @ApiProperty({
    description: 'Usuário do servidor SMTP',
    example: 'contato@meu-ecommerce.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  emailSmtpUser?: string;

  @ApiProperty({
    description: 'Senha do servidor SMTP',
    example: 'senha-smtp-segura',
    required: false,
    format: 'password',
  })
  @IsOptional()
  @IsString()
  emailSmtpPassword?: string;

  @ApiProperty({
    description: 'Nome do remetente para emails',
    example: 'Equipe Meu E-commerce',
    required: false,
  })
  @IsOptional()
  @IsString()
  emailFromName?: string;

  @ApiProperty({
    description: 'Email do remetente',
    example: 'contato@meu-ecommerce.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  emailFromAddress?: string;

  // SMS Configuration
  @ApiProperty({
    description: 'Provedor de SMS',
    example: 'Twilio',
    required: false,
  })
  @IsOptional()
  @IsString()
  smsProvider?: string;

  @ApiProperty({
    description: 'Usuário do provedor de SMS',
    example: 'sms-api-user',
    required: false,
  })
  @IsOptional()
  @IsString()
  smsUsername?: string;

  @ApiProperty({
    description: 'Senha do provedor de SMS',
    example: 'sms-api-key-secret',
    required: false,
    format: 'password',
  })
  @IsOptional()
  @IsString()
  smsPassword?: string;
}
