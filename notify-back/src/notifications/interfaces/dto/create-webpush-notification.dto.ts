import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWebPushNotificationDto {
  @ApiProperty({ description: 'ID do aplicativo' })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({ description: 'ID do destinatário (opcional)' })
  @IsString()
  @IsOptional()
  targetId?: string;

  @ApiProperty({ description: 'Título da notificação' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Mensagem da notificação' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'URL do ícone (opcional)' })
  @IsString()
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ description: 'URL de redirecionamento ao clicar (opcional)' })
  @IsString()
  @IsOptional()
  linkUrl?: string;
}
