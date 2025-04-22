import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../domain/entities/application.entity';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private readonly repository: Repository<Application>,
  ) {}

  async create(application: Partial<Application>): Promise<Application> {
    const newApplication = this.repository.create(application);
    return await this.repository.save(newApplication);
  }

  async findById(id: string): Promise<Application | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Application[]> {
    return await this.repository.find({ where: { userId } });
  }

  async update(
    id: string,
    application: Partial<Application>,
  ): Promise<Application> {
    await this.repository.update(id, application);
    const updatedApplication = await this.findById(id);
    if (!updatedApplication) {
      throw new Error(`Application with id ${id} not found`);
    }
    return updatedApplication;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
