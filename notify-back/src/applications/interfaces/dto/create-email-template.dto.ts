import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty({ description: 'Nome do template de e-mail' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Conteúdo HTML do template' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
