import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { TransformInterceptor } from './inceptor/transform.inceptor';
import { HttpExceptionFilter } from './inceptor/http-filter';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './configs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  // swagger
  const docConfig = new DocumentBuilder()
    .setTitle('wm-chat')
    .setDescription('The wm-chat API description')
    .setVersion('1.0')
    .addTag('wm-chat')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(config.PORT);
}
bootstrap();
