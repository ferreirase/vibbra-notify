import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotificationChannel } from '../../../applications/domain/entities/application.entity';
import { NotificationOrigin } from '../../domain/entities/notification.entity';

export class NotificationFilterDto {
  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  applicationId?: string;

  @ApiProperty({
    description: 'Canal de notificação',
    enum: NotificationChannel,
    example: NotificationChannel.WEB_PUSH,
    required: false,
  })
  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: NotificationChannel;

  @ApiProperty({
    description: 'Origem da notificação',
    enum: NotificationOrigin,
    example: NotificationOrigin.PLATFORM,
    required: false,
  })
  @IsEnum(NotificationOrigin)
  @IsOptional()
  origin?: NotificationOrigin;

  @ApiProperty({
    description: 'Data inicial',
    example: '2023-01-01T00:00:00Z',
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Data final',
    example: '2023-12-31T23:59:59Z',
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'Termo de busca',
    example: 'promoção',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  searchTerm?: string;
}
