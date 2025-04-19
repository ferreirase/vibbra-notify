import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty({
    description: 'Nome do template de e-mail',
    example: 'Template de Boas-vindas',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Conteúdo HTML do template',
    example: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bem-vindo!</title>
    </head>
    <body>
      <h1>Olá {{name}},</h1>
      <p>Bem-vindo à nossa plataforma!</p>
      <p>Clique <a href="{{link}}">aqui</a> para acessar sua conta.</p>
      <p>Atenciosamente,<br>Equipe Notify</p>
    </body>
    </html>
    `,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
