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
import { CreateEmailNotificationDto } from '../dto/create-email-notification.dto';
import { CreateSmsNotificationDto } from '../dto/create-sms-notification.dto';
import { CreateWebPushNotificationDto } from '../dto/create-webpush-notification.dto';
import { NotificationFilterDto } from '../dto/notification-filter.dto';
import {
  NotificationResponseDto,
  PaginatedNotificationsResponseDto,
} from '../dto/notification-response.dto';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('web-push')
  @ApiOperation({ summary: 'Criar nova notificação Web Push' })
  @ApiResponse({
    status: 201,
    description: 'Notificação Web Push criada com sucesso',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
  async createWebPush(
    @Request() req,
    @Body() createWebPushNotificationDto: CreateWebPushNotificationDto,
  ): Promise<NotificationResponseDto> {
    const notification =
      await this.notificationService.createWebPushNotification(
        req.user.id,
        createWebPushNotificationDto,
      );
    return new NotificationResponseDto(notification);
  }

  @Post('email')
  @ApiOperation({ summary: 'Criar nova notificação por Email' })
  @ApiResponse({
    status: 201,
    description: 'Notificação por Email criada com sucesso',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({
    status: 404,
    description: 'Aplicativo ou template não encontrado',
  })
  async createEmail(
    @Request() req,
    @Body() createEmailNotificationDto: CreateEmailNotificationDto,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.createEmailNotification(
      req.user.id,
      createEmailNotificationDto,
    );
    return new NotificationResponseDto(notification);
  }

  @Post('sms')
  @ApiOperation({ summary: 'Criar nova notificação SMS' })
  @ApiResponse({
    status: 201,
    description: 'Notificação SMS criada com sucesso',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
  async createSms(
    @Request() req,
    @Body() createSmsNotificationDto: CreateSmsNotificationDto,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.createSmsNotification(
      req.user.id,
      createSmsNotificationDto,
    );
    return new NotificationResponseDto(notification);
  }

  @Get()
  @ApiOperation({ summary: 'Listar notificações com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notificações',
    type: PaginatedNotificationsResponseDto,
  })
  async findAll(
    @Request() req,
    @Query() filter: NotificationFilterDto,
  ): Promise<PaginatedNotificationsResponseDto> {
    const [notifications, total] = await this.notificationService.findByFilter(
      req.user.id,
      filter,
    );
    return new PaginatedNotificationsResponseDto(notifications, total);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar notificação por ID' })
  @ApiResponse({
    status: 200,
    description: 'Notificação encontrada',
    type: NotificationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  async findOne(@Param('id') id: string): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.findById(id);
    return new NotificationResponseDto(notification);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  @ApiResponse({ status: 200, description: 'Notificação marcada como lida' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  async markAsRead(@Param('id') id: string): Promise<void> {
    await this.notificationService.markAsRead(id);
  }
}
