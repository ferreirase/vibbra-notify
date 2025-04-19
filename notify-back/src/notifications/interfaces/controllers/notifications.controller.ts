import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { NotificationService } from '../../application/services/notification.service';
import { Notification } from '../../domain/entities/notification.entity';
import { CreateEmailNotificationDto } from '../dto/create-email-notification.dto';
import { CreateSmsNotificationDto } from '../dto/create-sms-notification.dto';
import { CreateWebPushNotificationDto } from '../dto/create-webpush-notification.dto';
import { NotificationFilterDto } from '../dto/notification-filter.dto';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('web-push')
  @ApiOperation({ summary: 'Create a new web push notification' })
  @ApiResponse({
    status: 201,
    description: 'Web push notification created successfully',
  })
  async createWebPush(
    @Request() req,
    @Body() createWebPushNotificationDto: CreateWebPushNotificationDto,
  ): Promise<Notification> {
    return await this.notificationService.createWebPushNotification(
      req.user.id,
      createWebPushNotificationDto,
    );
  }

  @Post('email')
  @ApiOperation({ summary: 'Create a new email notification' })
  @ApiResponse({
    status: 201,
    description: 'Email notification created successfully',
  })
  async createEmail(
    @Request() req,
    @Body() createEmailNotificationDto: CreateEmailNotificationDto,
  ): Promise<Notification> {
    return await this.notificationService.createEmailNotification(
      req.user.id,
      createEmailNotificationDto,
    );
  }

  @Post('sms')
  @ApiOperation({ summary: 'Create a new SMS notification' })
  @ApiResponse({
    status: 201,
    description: 'SMS notification created successfully',
  })
  async createSms(
    @Request() req,
    @Body() createSmsNotificationDto: CreateSmsNotificationDto,
  ): Promise<Notification> {
    return await this.notificationService.createSmsNotification(
      req.user.id,
      createSmsNotificationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get notifications with filtering' })
  @ApiResponse({ status: 200, description: 'Return filtered notifications' })
  async findAll(
    @Request() req,
    @Query() filter: NotificationFilterDto,
  ): Promise<{ data: Notification[]; total: number }> {
    const [notifications, total] = await this.notificationService.findByFilter(
      req.user.id,
      filter,
    );
    return { data: notifications, total };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by id' })
  @ApiResponse({ status: 200, description: 'Notification found' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async findOne(@Param('id') id: string): Promise<Notification> {
    return await this.notificationService.findById(id);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markAsRead(@Param('id') id: string): Promise<void> {
    await this.notificationService.markAsRead(id);
  }
}
