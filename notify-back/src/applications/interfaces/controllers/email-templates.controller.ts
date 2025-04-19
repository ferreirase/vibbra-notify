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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { EmailTemplateService } from '../../application/services/email-template.service';
import { EmailTemplate } from '../../domain/entities/email-template.entity';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';

@ApiTags('email-templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications/:applicationId/email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new email template' })
  @ApiResponse({
    status: 201,
    description: 'Email template created successfully',
  })
  async create(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Body() createEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    return await this.emailTemplateService.create(
      applicationId,
      req.user.id,
      createEmailTemplateDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all email templates for an application' })
  @ApiResponse({ status: 200, description: 'Email templates found' })
  async findAll(
    @Request() req,
    @Param('applicationId') applicationId: string,
  ): Promise<EmailTemplate[]> {
    return await this.emailTemplateService.findByApplicationId(
      applicationId,
      req.user.id,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get email template by id' })
  @ApiResponse({ status: 200, description: 'Email template found' })
  @ApiResponse({ status: 404, description: 'Email template not found' })
  async findOne(@Param('id') id: string): Promise<EmailTemplate> {
    return await this.emailTemplateService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update email template' })
  @ApiResponse({
    status: 200,
    description: 'Email template updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Email template not found' })
  async update(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    return await this.emailTemplateService.update(
      id,
      applicationId,
      req.user.id,
      updateEmailTemplateDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete email template' })
  @ApiResponse({
    status: 200,
    description: 'Email template deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Email template not found' })
  async remove(
    @Request() req,
    @Param('applicationId') applicationId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.emailTemplateService.delete(id, applicationId, req.user.id);
  }
}
