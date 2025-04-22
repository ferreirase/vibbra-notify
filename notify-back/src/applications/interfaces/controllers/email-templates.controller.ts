import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { EmailTemplateService } from '../../application/services/email-template.service';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import {
  EmailTemplateListResponseDto,
  EmailTemplateResponseDto,
} from '../dto/email-template-response.dto';

@ApiTags('email-templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications/:applicationId/email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo template de email' })
  @ApiParam({
    name: 'applicationId',
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: 'string',
  })
  @ApiResponse({
    status: 201,
    description: 'Template de email criado com sucesso',
    type: EmailTemplateResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
  async create(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Body() createEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplateResponseDto> {
    const template = await this.emailTemplateService.create(
      applicationId,
      req.user.id,
      createEmailTemplateDto,
    );
    return new EmailTemplateResponseDto(template);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os templates de email de um aplicativo',
  })
  @ApiParam({
    name: 'applicationId',
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Templates encontrados',
    type: EmailTemplateListResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
  async findAll(
    @Request() req,
    @Param('applicationId') applicationId: string,
  ): Promise<EmailTemplateListResponseDto> {
    const templates = await this.emailTemplateService.findByApplicationId(
      applicationId,
      req.user.id,
    );
    return new EmailTemplateListResponseDto(templates);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar template de email por ID' })
  @ApiParam({
    name: 'applicationId',
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: 'string',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template',
    example: '550e8400-e29b-41d4-a716-446655440002',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Template encontrado',
    type: EmailTemplateResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async findOne(@Param('id') id: string): Promise<EmailTemplateResponseDto> {
    const template = await this.emailTemplateService.findById(id);
    return new EmailTemplateResponseDto(template);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar template de email' })
  @ApiParam({
    name: 'applicationId',
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: 'string',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template',
    example: '550e8400-e29b-41d4-a716-446655440002',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Template atualizado com sucesso',
    type: EmailTemplateResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async update(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplateResponseDto> {
    const template = await this.emailTemplateService.update(
      id,
      applicationId,
      req.user.id,
      updateEmailTemplateDto,
    );
    return new EmailTemplateResponseDto(template);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir template de email' })
  @ApiParam({
    name: 'applicationId',
    description: 'ID do aplicativo',
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: 'string',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template',
    example: '550e8400-e29b-41d4-a716-446655440002',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Template excluído com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Template não encontrado' })
  async remove(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.emailTemplateService.delete(id, applicationId, req.user.id);
  }
}
