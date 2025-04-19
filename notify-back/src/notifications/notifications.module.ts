import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsModule } from '../applications/applications.module';
import { NotificationService } from './application/services/notification.service';
import { Notification } from './domain/entities/notification.entity';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { NotificationsController } from './interfaces/controllers/notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), ApplicationsModule],
  controllers: [NotificationsController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationsModule {}
