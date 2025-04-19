import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationChannel } from '../../domain/entities/application.entity';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels: NotificationChannel[];

  @IsOptional()
  @IsString()
  webPushSiteName?: string;

  @IsOptional()
  @IsString()
  webPushSiteUrl?: string;

  @IsOptional()
  @IsString()
  webPushIconUrl?: string;

  @IsOptional()
  @IsString()
  webPushPermissionText?: string;

  @IsOptional()
  @IsString()
  webPushAllowButtonText?: string;

  @IsOptional()
  @IsString()
  webPushDenyButtonText?: string;

  @IsOptional()
  @IsString()
  webPushWelcomeTitle?: string;

  @IsOptional()
  @IsString()
  webPushWelcomeMessage?: string;

  @IsOptional()
  @IsString()
  webPushWelcomeUrl?: string;

  @IsOptional()
  @IsString()
  emailSmtpHost?: string;

  @IsOptional()
  @IsNumber()
  emailSmtpPort?: number;

  @IsOptional()
  @IsString()
  emailSmtpUser?: string;

  @IsOptional()
  @IsString()
  emailSmtpPassword?: string;

  @IsOptional()
  @IsString()
  emailFromName?: string;

  @IsOptional()
  @IsEmail()
  emailFromAddress?: string;

  @IsOptional()
  @IsString()
  smsProvider?: string;

  @IsOptional()
  @IsString()
  smsUsername?: string;

  @IsOptional()
  @IsString()
  smsPassword?: string;
}
