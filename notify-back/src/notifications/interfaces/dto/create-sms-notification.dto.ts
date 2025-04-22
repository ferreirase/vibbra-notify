import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateSmsNotificationDto {
  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({
    description: 'Número de telefone do destinatário',
    example: '+5511999999999',
    required: true,
    format: 'phone',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Mensagem SMS',
    example:
      'Seu código de verificação é: 123456. Não compartilhe este código com ninguém.',
    required: true,
    maxLength: 160,
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
