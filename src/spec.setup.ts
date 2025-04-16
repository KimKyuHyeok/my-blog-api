// test/spec.setup.ts
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import supertest from 'supertest';

let app: INestApplication;
let prisma: PrismaService;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AppModule
    ],
  }).compile();

  app = moduleRef.createNestApplication();
  prisma = app.get(PrismaService);

  await app.init();
});

beforeEach(async () => {
  const tables = ['Category', 'Board'];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM ${table}`);
  }
});

afterAll(async () => {
  await app.close();
});

export const request = (url: string, token?: string) => {
    if (token) {
        return supertest(app.getHttpServer())
            .post(url)
            .set('Authorization', `Bearer ${token}`)
    }

    return supertest(app.getHttpServer())
        .post(url)
}