import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
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
import { ApplicationService } from '../../application/services/application.service';
import {
  ApplicationListResponseDto,
  ApplicationResponseDto,
} from '../dto/application-response.dto';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';

@ApiTags('Aplicações')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova aplicação',
    description: 'Cria uma nova aplicação associada ao usuário autenticado',
  })
  @ApiResponse({
    status: 201,
    description: 'Aplicação criada com sucesso',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() req,
  ): Promise<ApplicationResponseDto> {
    const userId = req.user.id;
    const application = await this.applicationService.create(
      createApplicationDto,
      userId,
    );
    return new ApplicationResponseDto(application);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as aplicações',
    description: 'Lista todas as aplicações do usuário autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de aplicações',
    type: ApplicationListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  async findAll(@Req() req): Promise<ApplicationListResponseDto> {
    const userId = req.user.id;
    const applications = await this.applicationService.findByUserId(userId);
    return new ApplicationListResponseDto(
      applications,
      userId,
      req.user.email,
      req.user.name,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma aplicação pelo ID',
    description: 'Retorna os detalhes de uma aplicação específica pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da aplicação',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da aplicação',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Aplicação não encontrada',
  })
  async findOne(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ApplicationResponseDto> {
    const userId = req.user.id;
    const application = await this.applicationService.findById(id);
    return new ApplicationResponseDto(application);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma aplicação',
    description: 'Atualiza os detalhes de uma aplicação existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da aplicação a ser atualizada',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiResponse({
    status: 200,
    description: 'Aplicação atualizada com sucesso',
    type: ApplicationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Aplicação não encontrada',
  })
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Req() req,
  ): Promise<ApplicationResponseDto> {
    const userId = req.user.id;
    const application = await this.applicationService.update(
      id,
      userId,
      updateApplicationDto,
    );
    return new ApplicationResponseDto(application);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover uma aplicação',
    description: 'Remove uma aplicação e todos os seus dados associados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da aplicação a ser removida',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiResponse({
    status: 200,
    description: 'Aplicação removida com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Aplicação não encontrada',
  })
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    const userId = req.user.id;
    await this.applicationService.delete(id, userId);
  }
}
