import { Injectable, NotFoundException } from '@nestjs/common';
import { Application } from '../../domain/entities/application.entity';
import { ApplicationRepository } from '../../infrastructure/repositories/application.repository';
import { CreateApplicationDto } from '../../interfaces/dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async create(
    userId: string,
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return await this.applicationRepository.create({
      ...createApplicationDto,
      userId,
    });
  }

  async findById(id: string): Promise<Application> {
    const application = await this.applicationRepository.findById(id);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async findByUserId(userId: string): Promise<Application[]> {
    return await this.applicationRepository.findByUserId(userId);
  }

  async update(
    id: string,
    userId: string,
    updateApplicationDto: Partial<CreateApplicationDto>,
  ): Promise<Application> {
    const application = await this.findById(id);

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    return await this.applicationRepository.update(id, updateApplicationDto);
  }

  async delete(id: string, userId: string): Promise<void> {
    const application = await this.findById(id);

    if (application.userId !== userId) {
      throw new NotFoundException('Application not found');
    }

    await this.applicationRepository.delete(id);
  }
}
