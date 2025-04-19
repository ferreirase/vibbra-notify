import { ApiProperty } from '@nestjs/swagger';
import {
  Application,
  NotificationChannel,
} from '../../domain/entities/application.entity';

export class ApplicationResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID da aplicação',
  })
  id: string;

  @ApiProperty({
    example: 'Minha Aplicação',
    description: 'Nome da aplicação',
  })
  name: string;

  @ApiProperty({
    example: 'Descrição da minha aplicação',
    description: 'Descrição da aplicação',
  })
  description: string;

  @ApiProperty({
    example: ['WEB_PUSH', 'EMAIL'],
    description: 'Canais de notificação disponíveis',
    enum: NotificationChannel,
    isArray: true,
  })
  channels: NotificationChannel[];

  // Web Push Configuration
  @ApiProperty({
    example: 'Meu Site',
    description: 'Nome do site para Web Push',
    nullable: true,
  })
  webPushSiteName: string;

  @ApiProperty({
    description: 'URL do site para Web Push',
    example: 'https://meu-ecommerce.com',
    required: false,
  })
  webPushSiteUrl?: string;

  @ApiProperty({
    description: 'URL do ícone para Web Push',
    example: 'https://meu-ecommerce.com/icon.png',
    required: false,
  })
  webPushIconUrl?: string;

  @ApiProperty({
    description: 'Texto de solicitação de permissão para Web Push',
    example: 'Deseja receber notificações de novas promoções?',
    required: false,
  })
  webPushPermissionText?: string;

  @ApiProperty({
    description: 'Texto do botão Permitir para Web Push',
    example: 'Sim, quero receber',
    required: false,
  })
  webPushAllowButtonText?: string;

  @ApiProperty({
    description: 'Texto do botão Negar para Web Push',
    example: 'Agora não',
    required: false,
  })
  webPushDenyButtonText?: string;

  @ApiProperty({
    description: 'Título da mensagem de boas-vindas para Web Push',
    example: 'Bem-vindo ao Meu E-commerce!',
    required: false,
  })
  webPushWelcomeTitle?: string;

  @ApiProperty({
    description: 'Texto da mensagem de boas-vindas para Web Push',
    example:
      'Obrigado por ativar as notificações. Você receberá atualizações sobre promoções e novidades.',
    required: false,
  })
  webPushWelcomeMessage?: string;

  @ApiProperty({
    description:
      'URL de redirecionamento da mensagem de boas-vindas para Web Push',
    example: 'https://meu-ecommerce.com/promocoes',
    required: false,
  })
  webPushWelcomeUrl?: string;

  // Email Configuration
  @ApiProperty({
    description: 'Servidor SMTP para envio de emails',
    example: 'smtp.gmail.com',
    required: false,
  })
  emailSmtpHost?: string;

  @ApiProperty({
    description: 'Porta do servidor SMTP',
    example: 587,
    required: false,
  })
  emailSmtpPort?: number;

  @ApiProperty({
    description: 'Usuário do servidor SMTP',
    example: 'contato@meu-ecommerce.com',
    required: false,
  })
  emailSmtpUser?: string;

  @ApiProperty({
    description: 'Nome do remetente para emails',
    example: 'Equipe Meu E-commerce',
    required: false,
  })
  emailFromName?: string;

  @ApiProperty({
    description: 'Email do remetente',
    example: 'contato@meu-ecommerce.com',
    required: false,
  })
  emailFromAddress?: string;

  // SMS Configuration
  @ApiProperty({
    description: 'Provedor de SMS',
    example: 'Twilio',
    required: false,
  })
  smsProvider?: string;

  @ApiProperty({
    description: 'Usuário do provedor de SMS',
    example: 'sms-api-user',
    required: false,
  })
  smsUsername?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do usuário proprietário',
  })
  userId: string;

  @ApiProperty({
    example: '2023-06-15T10:30:00Z',
    description: 'Data de criação',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-06-15T10:30:00Z',
    description: 'Data de atualização',
  })
  updatedAt: Date;

  constructor(application: Application) {
    this.id = application.id;
    this.name = application.name;
    this.description = application.description;
    this.channels = application.channels;
    this.webPushSiteName = application.webPushSiteName;
    this.webPushSiteUrl = application.webPushSiteUrl;
    this.webPushIconUrl = application.webPushIconUrl;
    this.webPushPermissionText = application.webPushPermissionText;
    this.webPushAllowButtonText = application.webPushAllowButtonText;
    this.webPushDenyButtonText = application.webPushDenyButtonText;
    this.webPushWelcomeTitle = application.webPushWelcomeTitle;
    this.webPushWelcomeMessage = application.webPushWelcomeMessage;
    this.webPushWelcomeUrl = application.webPushWelcomeUrl;
    this.emailSmtpHost = application.emailSmtpHost;
    this.emailSmtpPort = application.emailSmtpPort;
    this.emailSmtpUser = application.emailSmtpUser;
    this.emailFromName = application.emailFromName;
    this.emailFromAddress = application.emailFromAddress;
    this.smsProvider = application.smsProvider;
    this.smsUsername = application.smsUsername;
    this.userId = application.userId;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
  }
}

export class ApplicationListResponseDto {
  @ApiProperty({
    type: [ApplicationResponseDto],
    description: 'Lista de aplicações',
  })
  items: ApplicationResponseDto[];

  @ApiProperty({
    example: 10,
    description: 'Total de registros',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Página atual',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Tamanho da página',
  })
  limit: number;

  constructor(
    applications: Application[],
    total: number,
    page: number,
    limit: number,
  ) {
    this.items = applications.map(
      (application) => new ApplicationResponseDto(application),
    );
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}
