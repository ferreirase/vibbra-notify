import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotificationChannel } from '../../../applications/domain/entities/application.entity';
import { NotificationOrigin } from '../../domain/entities/notification.entity';

export class NotificationFilterDto {
  @ApiProperty({ description: 'ID do aplicativo', required: false })
  @IsUUID()
  @IsOptional()
  applicationId?: string;

  @ApiProperty({
    description: 'Canal de notificação',
    enum: NotificationChannel,
    required: false,
  })
  @IsEnum(NotificationChannel)
  @IsOptional()
  channel?: NotificationChannel;

  @ApiProperty({
    description: 'Origem da notificação',
    enum: NotificationOrigin,
    required: false,
  })
  @IsEnum(NotificationOrigin)
  @IsOptional()
  origin?: NotificationOrigin;

  @ApiProperty({ description: 'Data inicial', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: 'Data final', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Termo de busca', required: false })
  @IsString()
  @IsOptional()
  searchTerm?: string;
}
