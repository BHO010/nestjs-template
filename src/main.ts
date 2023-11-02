import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType  } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  app.enableCors({ 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Access-Control-Allow-Credentials value to true
    origin: '*'
  });
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle('Nestjs Template')
    .setDescription('Nestjs Template Api descriptions')
    .setVersion('1.0')
    .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter Access token',
        in: 'header',
      },
      "Bearer"
    )
    .addTag('Auth')
    .addTag('Google-service')
    .addTag('Healthcheck')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
