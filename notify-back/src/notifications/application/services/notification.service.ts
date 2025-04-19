import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationService } from '../../../applications/application/services/application.service';
import { EmailTemplateService } from '../../../applications/application/services/email-template.service';
import { NotificationChannel } from '../../../applications/domain/entities/application.entity';
import {
  Notification,
  NotificationOrigin,
  NotificationStatus,
} from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../infrastructure/repositories/notification.repository';
import { CreateEmailNotificationDto } from '../../interfaces/dto/create-email-notification.dto';
import { CreateSmsNotificationDto } from '../../interfaces/dto/create-sms-notification.dto';
import { CreateWebPushNotificationDto } from '../../interfaces/dto/create-webpush-notification.dto';
import { NotificationFilterDto } from '../../interfaces/dto/notification-filter.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly applicationService: ApplicationService,
    private readonly emailTemplateService: EmailTemplateService,
  ) {}

  async createWebPushNotification(
    userId: string,
    dto: CreateWebPushNotificationDto,
  ): Promise<Notification> {
    const application = await this.applicationService.findById(
      dto.applicationId,
    );

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    if (!application.channels.includes(NotificationChannel.WEB_PUSH)) {
      throw new BadRequestException(
        'Web Push channel not configured for this application',
      );
    }

    const notification = await this.notificationRepository.create({
      channel: NotificationChannel.WEB_PUSH,
      origin: NotificationOrigin.PLATFORM,
      status: NotificationStatus.PENDING,
      applicationId: dto.applicationId,
      title: dto.title,
      message: dto.message,
      targetId: dto.targetId,
      iconUrl: dto.iconUrl || application.webPushIconUrl,
      linkUrl: dto.linkUrl,
    });

    // Em um cenário real, aqui seria chamado o serviço de envio de WebPush
    // Exemplo: this.webPushSender.send(notification);

    // Simulando envio bem-sucedido
    await this.notificationRepository.updateStatus(
      notification.id,
      NotificationStatus.SENT,
    );

    return notification;
  }

  async createEmailNotification(
    userId: string,
    dto: CreateEmailNotificationDto,
  ): Promise<Notification> {
    const application = await this.applicationService.findById(
      dto.applicationId,
    );

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    if (!application.channels.includes(NotificationChannel.EMAIL)) {
      throw new BadRequestException(
        'Email channel not configured for this application',
      );
    }

    // Verifica se o template existe e pertence ao aplicativo
    const template = await this.emailTemplateService.findById(dto.templateId);

    if (template.applicationId !== dto.applicationId) {
      throw new BadRequestException(
        'Email template not found for this application',
      );
    }

    const notification = await this.notificationRepository.create({
      channel: NotificationChannel.EMAIL,
      origin: NotificationOrigin.PLATFORM,
      status: NotificationStatus.PENDING,
      applicationId: dto.applicationId,
      targetId: dto.email,
      emailSubject: dto.subject,
      emailTemplateId: dto.templateId,
      emailData: dto.data || {},
    });

    // Em um cenário real, aqui seria chamado o serviço de envio de Email
    // Exemplo: this.emailSender.send(notification, template, application);

    // Simulando envio bem-sucedido
    await this.notificationRepository.updateStatus(
      notification.id,
      NotificationStatus.SENT,
    );

    return notification;
  }

  async createSmsNotification(
    userId: string,
    dto: CreateSmsNotificationDto,
  ): Promise<Notification> {
    const application = await this.applicationService.findById(
      dto.applicationId,
    );

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    if (!application.channels.includes(NotificationChannel.SMS)) {
      throw new BadRequestException(
        'SMS channel not configured for this application',
      );
    }

    const notification = await this.notificationRepository.create({
      channel: NotificationChannel.SMS,
      origin: NotificationOrigin.PLATFORM,
      status: NotificationStatus.PENDING,
      applicationId: dto.applicationId,
      phoneNumber: dto.phoneNumber,
      message: dto.message,
    });

    // Em um cenário real, aqui seria chamado o serviço de envio de SMS
    // Exemplo: this.smsSender.send(notification, application);

    // Simulando envio bem-sucedido
    await this.notificationRepository.updateStatus(
      notification.id,
      NotificationStatus.SENT,
    );

    return notification;
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async findByFilter(
    userId: string,
    filter: NotificationFilterDto,
  ): Promise<[Notification[], number]> {
    // Se filtrar por applicationId, verifica se o usuário tem acesso ao aplicativo
    if (filter.applicationId) {
      const application = await this.applicationService.findById(
        filter.applicationId,
      );

      if (application.userId !== userId) {
        throw new NotFoundException('Application not found');
      }
    }

    return await this.notificationRepository.findByFilter(filter);
  }

  async markAsRead(id: string): Promise<void> {
    const notification = await this.findById(id);
    await this.notificationRepository.markAsRead(notification.id);
  }
}
