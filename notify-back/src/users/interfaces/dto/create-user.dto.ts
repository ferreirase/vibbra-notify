import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário (deve ser único)',
    example: 'usuario@exemplo.com',
    format: 'email',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 3,
    required: true,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
    required: true,
    format: 'password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
