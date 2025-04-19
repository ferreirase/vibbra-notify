import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateSmsNotificationDto {
  @ApiProperty({ description: 'ID do aplicativo' })
  @IsUUID()
  @IsNotEmpty()
  applicationId: string;

  @ApiProperty({
    description: 'Número de telefone do destinatário',
    example: '+5511999999999',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Mensagem SMS' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
