import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from '../../../applications/domain/entities/application.entity';
import {
  Notification,
  NotificationOrigin,
  NotificationStatus,
} from '../../domain/entities/notification.entity';

export class NotificationResponseDto {
  @ApiProperty({
    description: 'ID da notificação',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Canal de notificação',
    enum: NotificationChannel,
    example: NotificationChannel.WEB_PUSH,
  })
  channel: NotificationChannel;

  @ApiProperty({
    description: 'Status da notificação',
    enum: NotificationStatus,
    example: NotificationStatus.SENT,
  })
  status: NotificationStatus;

  @ApiProperty({
    description: 'Origem da notificação',
    enum: NotificationOrigin,
    example: NotificationOrigin.PLATFORM,
  })
  origin: NotificationOrigin;

  @ApiProperty({
    description: 'Título da notificação',
    example: 'Nova promoção',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Mensagem da notificação',
    example: 'Aproveite nossas promoções especiais!',
    required: false,
  })
  message?: string;

  @ApiProperty({
    description: 'ID do destinatário',
    example: 'user123',
    required: false,
  })
  targetId?: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2023-07-01T14:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de envio',
    example: '2023-07-01T14:30:01Z',
    required: false,
  })
  sentAt?: Date;

  @ApiProperty({
    description: 'Data de entrega',
    example: '2023-07-01T14:30:02Z',
    required: false,
  })
  deliveredAt?: Date;

  @ApiProperty({
    description: 'Data de leitura',
    example: '2023-07-01T14:35:00Z',
    required: false,
  })
  readAt?: Date;

  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  applicationId: string;

  @ApiProperty({
    description: 'Nome do aplicativo',
    example: 'Meu E-commerce',
    required: false,
  })
  applicationName?: string;

  constructor(notification: Notification) {
    this.id = notification.id;
    this.channel = notification.channel;
    this.status = notification.status;
    this.origin = notification.origin;
    this.title = notification.title;
    this.message = notification.message;
    this.targetId = notification.targetId;
    this.createdAt = notification.createdAt;
    this.sentAt = notification.sentAt;
    this.deliveredAt = notification.deliveredAt;
    this.readAt = notification.readAt;
    this.applicationId = notification.applicationId;
    this.applicationName = notification.application?.name;
  }
}

export class PaginatedNotificationsResponseDto {
  @ApiProperty({
    description: 'Lista de notificações',
    type: [NotificationResponseDto],
  })
  data: NotificationResponseDto[];

  @ApiProperty({
    description: 'Total de registros',
    example: 42,
  })
  total: number;

  constructor(notifications: Notification[], total: number) {
    this.data = notifications.map(
      (notification) => new NotificationResponseDto(notification),
    );
    this.total = total;
  }
}
