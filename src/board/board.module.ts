import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
    providers: [BoardService, PrismaService],
    controllers: [BoardController]
  })
export class BoardModule {}
