import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [CategoryModule, BoardModule],
  controllers: [AppController, BoardController],
  providers: [AppService, BoardService],
})
export class AppModule {}
