import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuração do CORS para permitir acesso da parte frontend
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Notify API')
    .setDescription(
      `
      API para sistema de notificações multiplos canais (Web Push, E-mail, SMS).
      
      ## Autenticação
      Para acessar os endpoints protegidos, é necessário obter um token JWT através do endpoint /auth/login.
      O token deve ser enviado no header Authorization com o prefixo Bearer.
      
      ## Funcionalidades
      - Gerenciamento de aplicativos e suas configurações
      - Configuração de canais (Web Push, E-mail, SMS)
      - Envio de notificações pelos diferentes canais
      - Histórico e monitoramento de notificações
    `,
    )
    .setVersion('1.0')
    .addTag('auth', 'Autenticação na plataforma')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('applications', 'Gerenciamento de aplicativos')
    .addTag('email-templates', 'Gerenciamento de templates de e-mail')
    .addTag('notifications', 'Envio e monitoramento de notificações')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Entre com o token JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
