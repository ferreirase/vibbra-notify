import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailTemplate } from '../../domain/entities/email-template.entity';
import { EmailTemplateRepository } from '../../infrastructure/repositories/email-template.repository';
import { CreateEmailTemplateDto } from '../../interfaces/dto/create-email-template.dto';
import { ApplicationService } from './application.service';

@Injectable()
export class EmailTemplateService {
  constructor(
    private readonly emailTemplateRepository: EmailTemplateRepository,
    private readonly applicationService: ApplicationService,
  ) {}

  async create(
    applicationId: string,
    userId: string,
    createEmailTemplateDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    // Verifica se o aplicativo existe e pertence ao usuário
    const application = await this.applicationService.findById(applicationId);

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    return await this.emailTemplateRepository.create({
      ...createEmailTemplateDto,
      applicationId,
    });
  }

  async findById(id: string): Promise<EmailTemplate> {
    const template = await this.emailTemplateRepository.findById(id);

    if (!template) {
      throw new NotFoundException('Email template not found');
    }

    return template;
  }

  async findByApplicationId(
    applicationId: string,
    userId: string,
  ): Promise<EmailTemplate[]> {
    // Verifica se o aplicativo existe e pertence ao usuário
    const application = await this.applicationService.findById(applicationId);

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    return await this.emailTemplateRepository.findByApplicationId(
      applicationId,
    );
  }

  async update(
    id: string,
    applicationId: string,
    userId: string,
    updateEmailTemplateDto: Partial<CreateEmailTemplateDto>,
  ): Promise<EmailTemplate> {
    // Verifica se o template existe
    const template = await this.findById(id);

    // Verifica se o aplicativo existe e pertence ao usuário
    const application = await this.applicationService.findById(applicationId);

    if (
      application.userId !== userId ||
      template.applicationId !== applicationId
    ) {
      throw new NotFoundException('Email template not found');
    }

    return await this.emailTemplateRepository.update(
      id,
      updateEmailTemplateDto,
    );
  }

  async delete(
    id: string,
    applicationId: string,
    userId: string,
  ): Promise<void> {
    // Verifica se o template existe
    const template = await this.findById(id);

    // Verifica se o aplicativo existe e pertence ao usuário
    const application = await this.applicationService.findById(applicationId);

    if (
      application.userId !== userId ||
      template.applicationId !== applicationId
    ) {
      throw new NotFoundException('Email template not found');
    }

    await this.emailTemplateRepository.delete(id);
  }
}
