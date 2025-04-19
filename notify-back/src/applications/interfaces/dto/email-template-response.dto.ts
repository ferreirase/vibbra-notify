import { ApiProperty } from '@nestjs/swagger';
import { EmailTemplate } from '../../domain/entities/email-template.entity';

export class EmailTemplateResponseDto {
  @ApiProperty({
    description: 'ID do template de email',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do template de email',
    example: 'Template de Boas-vindas',
  })
  name: string;

  @ApiProperty({
    description: 'Conteúdo HTML do template',
    example: `<!DOCTYPE html>
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
</html>`,
  })
  content: string;

  @ApiProperty({
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  applicationId: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2023-07-01T14:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2023-07-01T15:45:00Z',
  })
  updatedAt: Date;

  constructor(template: EmailTemplate) {
    this.id = template.id;
    this.name = template.name;
    this.content = template.content;
    this.applicationId = template.applicationId;
    this.createdAt = template.createdAt;
    this.updatedAt = template.updatedAt;
  }
}

export class EmailTemplateListResponseDto {
  @ApiProperty({
    description: 'Lista de templates de email',
    type: [EmailTemplateResponseDto],
  })
  templates: EmailTemplateResponseDto[];

  constructor(templates: EmailTemplate[]) {
    this.templates = templates.map(
      (template) => new EmailTemplateResponseDto(template),
    );
  }
}
