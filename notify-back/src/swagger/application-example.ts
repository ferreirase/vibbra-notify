import { NotificationChannel } from '../applications/domain/entities/application.entity';

export const applicationExample = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  name: 'Meu E-commerce',
  channels: [NotificationChannel.WEB_PUSH, NotificationChannel.EMAIL],
  webPushSiteName: 'Meu E-commerce',
  webPushSiteUrl: 'https://meu-ecommerce.com',
  webPushIconUrl: 'https://meu-ecommerce.com/icon.png',
  webPushPermissionText: 'Deseja receber notificações de novas promoções?',
  webPushAllowButtonText: 'Sim, quero receber',
  webPushDenyButtonText: 'Agora não',
  webPushWelcomeTitle: 'Bem-vindo ao Meu E-commerce!',
  webPushWelcomeMessage:
    'Obrigado por ativar as notificações. Você receberá atualizações sobre promoções e novidades.',
  webPushWelcomeUrl: 'https://meu-ecommerce.com/promocoes',
  emailSmtpHost: 'smtp.gmail.com',
  emailSmtpPort: 587,
  emailSmtpUser: 'contato@meu-ecommerce.com',
  emailSmtpPassword: 'senha-smtp-segura',
  emailFromName: 'Equipe Meu E-commerce',
  emailFromAddress: 'contato@meu-ecommerce.com',
  userId: '550e8400-e29b-41d4-a716-446655440000',
  createdAt: new Date('2023-07-01T10:00:00Z'),
  updatedAt: new Date('2023-07-01T10:00:00Z'),
};

export const emailTemplateExample = {
  id: '550e8400-e29b-41d4-a716-446655440002',
  name: 'Template de Boas-vindas',
  content: `<!DOCTYPE html>
<html>
<head>
  <title>Bem-vindo!</title>
</head>
<body>
  <h1>Olá {{name}},</h1>
  <p>Bem-vindo à nossa plataforma!</p>
  <p>Clique <a href="{{link}}">aqui</a> para acessar sua conta.</p>
  <p>Atenciosamente,<br>Equipe Notify</p>
</body>
</html>`,
  applicationId: '550e8400-e29b-41d4-a716-446655440001',
  createdAt: new Date('2023-07-01T14:30:00Z'),
  updatedAt: new Date('2023-07-01T15:45:00Z'),
};

export const notificationExamples = {
  webPush: {
    id: '550e8400-e29b-41d4-a716-446655440003',
    channel: NotificationChannel.WEB_PUSH,
    status: 'SENT',
    origin: 'PLATFORM',
    title: 'Nova promoção disponível!',
    message: 'Aproveite os descontos de até 50% em produtos selecionados.',
    iconUrl: 'https://meu-ecommerce.com/icon.png',
    linkUrl: 'https://meu-ecommerce.com/promocoes',
    applicationId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: new Date('2023-07-01T14:30:00Z'),
    sentAt: new Date('2023-07-01T14:30:01Z'),
  },
  email: {
    id: '550e8400-e29b-41d4-a716-446655440004',
    channel: NotificationChannel.EMAIL,
    status: 'SENT',
    origin: 'PLATFORM',
    targetId: 'cliente@exemplo.com',
    emailSubject: 'Confirmação de cadastro',
    emailTemplateId: '550e8400-e29b-41d4-a716-446655440002',
    emailData: {
      name: 'João Silva',
      link: 'https://aplicativo.com/confirm?token=abc123',
    },
    applicationId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: new Date('2023-07-01T15:30:00Z'),
    sentAt: new Date('2023-07-01T15:30:01Z'),
  },
  sms: {
    id: '550e8400-e29b-41d4-a716-446655440005',
    channel: NotificationChannel.SMS,
    status: 'SENT',
    origin: 'PLATFORM',
    phoneNumber: '+5511999999999',
    message:
      'Seu código de verificação é: 123456. Não compartilhe este código com ninguém.',
    applicationId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: new Date('2023-07-01T16:30:00Z'),
    sentAt: new Date('2023-07-01T16:30:01Z'),
  },
};
