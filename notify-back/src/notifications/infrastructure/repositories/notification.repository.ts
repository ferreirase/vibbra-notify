import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import {
  Notification,
  NotificationStatus,
} from '../../domain/entities/notification.entity';
import { NotificationFilterDto } from '../../interfaces/dto/notification-filter.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async create(notification: Partial<Notification>): Promise<Notification> {
    const newNotification = this.repository.create(notification);
    return await this.repository.save(newNotification);
  }

  async findById(id: string): Promise<Notification | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['application'],
    });
  }

  async findByFilter(
    filter: NotificationFilterDto,
  ): Promise<[Notification[], number]> {
    const where: any = {};

    if (filter.applicationId) {
      where.applicationId = filter.applicationId;
    }

    if (filter.channel) {
      where.channel = filter.channel;
    }

    if (filter.origin) {
      where.origin = filter.origin;
    }

    // Date range filter
    if (filter.startDate && filter.endDate) {
      where.createdAt = Between(filter.startDate, filter.endDate);
    } else if (filter.startDate) {
      where.createdAt = Between(filter.startDate, new Date());
    }

    // Search term in title or message
    if (filter.searchTerm) {
      where.title = ILike(`%${filter.searchTerm}%`);
    }

    return await this.repository.findAndCount({
      where,
      relations: ['application'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(
    id: string,
    status: NotificationStatus,
    errorMessage?: string,
  ): Promise<void> {
    const updateData: Partial<Notification> = { status };

    if (errorMessage) {
      updateData.errorMessage = errorMessage;
    }

    // Update sent, delivered or read timestamp
    if (status === NotificationStatus.SENT) {
      updateData.sentAt = new Date();
    } else if (status === NotificationStatus.DELIVERED) {
      updateData.deliveredAt = new Date();
    } else if (status === NotificationStatus.READ) {
      updateData.readAt = new Date();
    }

    await this.repository.update(id, updateData);
  }

  async markAsRead(id: string): Promise<void> {
    await this.updateStatus(id, NotificationStatus.READ);
  }
}
