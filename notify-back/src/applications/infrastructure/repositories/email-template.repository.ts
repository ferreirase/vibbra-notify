import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from '../../domain/entities/email-template.entity';

@Injectable()
export class EmailTemplateRepository {
  constructor(
    @InjectRepository(EmailTemplate)
    private readonly repository: Repository<EmailTemplate>,
  ) {}

  async create(template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const newTemplate = this.repository.create(template);
    return await this.repository.save(newTemplate);
  }

  async findById(id: string): Promise<EmailTemplate | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByApplicationId(applicationId: string): Promise<EmailTemplate[]> {
    return await this.repository.find({ where: { applicationId } });
  }

  async update(
    id: string,
    template: Partial<EmailTemplate>,
  ): Promise<EmailTemplate> {
    await this.repository.update(id, template);
    const updatedTemplate = await this.findById(id);
    if (!updatedTemplate) {
      throw new Error(`Template with id ${id} not found`);
    }
    return updatedTemplate;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
