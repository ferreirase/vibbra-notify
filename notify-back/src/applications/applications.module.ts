import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application/services/application.service';
import { Application } from './domain/entities/application.entity';
import { ApplicationRepository } from './infrastructure/repositories/application.repository';
import { ApplicationsController } from './interfaces/controllers/applications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [ApplicationService, ApplicationRepository],
  exports: [ApplicationService],
})
export class ApplicationsModule {}
