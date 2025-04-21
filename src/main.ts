import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.VUE_URL, process.env.VUE_TEST_URL],
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
