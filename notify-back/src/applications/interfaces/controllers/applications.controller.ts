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
import { ApplicationService } from '../../application/services/application.service';
import { Application } from '../../domain/entities/application.entity';
import { CreateApplicationDto } from '../dto/create-application.dto';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  async create(
    @Request() req,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return await this.applicationService.create(
      req.user.id,
      createApplicationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all user applications' })
  @ApiResponse({ status: 200, description: 'Applications found' })
  async findAll(@Request() req): Promise<Application[]> {
    return await this.applicationService.findByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by id' })
  @ApiResponse({ status: 200, description: 'Application found' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async findOne(@Request() req, @Param('id') id: string): Promise<Application> {
    return await this.applicationService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update application' })
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return await this.applicationService.update(
      id,
      req.user.id,
      updateApplicationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    await this.applicationService.delete(id, req.user.id);
  }
}
