import { JwtAuthGuard } from 'src/config/auth.guard';
import { BoardService } from './board.service';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/config/admin.guard';
import { BoardCreateDto } from './dto/board.create.dto';
import { BoardUpdateDto } from './dto/board.update.dto';
import { BoardResponse } from './response/board.response';
import { BoardDeleteDto } from './dto/board.delete.dto';
import { CategoryAndBoardResponse } from './response/category-board.response';
import { RecentBoard } from './response/recent.board.response';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('/create')
    create(@Body() dto: BoardCreateDto): Promise<BoardResponse> {
        return this.boardService.create(dto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('/update')
    update(@Body() dto: BoardUpdateDto): Promise<BoardResponse> {
        return this.boardService.update(dto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('/delete')
    delete(@Body() dto: BoardDeleteDto): Promise<BoardResponse> {
        return this.boardService.delete(dto);
    }

    @Get('id')
    getBoardById(@Query('id') id: string): Promise<BoardResponse> {
        let boardId = parseInt(id, 10);
        return this.boardService.findById(boardId)
    }

    @Get('categoryId')
    getBoardByCategoryId(@Query('categoryId') id: string): Promise<BoardResponse[]> {
        let categoryId = parseInt(id, 10);
        return this.boardService.findByCategoryId(categoryId);
    }

    @Get('all')
    getBoardByAll(): Promise<BoardResponse[]> {
        return this.boardService.findAll();
    }

    @Get('/all/title')
    getCategoryAndTitleByAll(): Promise<CategoryAndBoardResponse[]> {
        return this.boardService.getCategoryAndTitle();
    }

    @Get('recent/boards')
    getRecentBoardTitles(): Promise<RecentBoard[]> {
        return this.boardService.getRecentBoardTitles();
    }

    @Get('recent')
    getRecentBoard(): Promise<BoardResponse> {
        return this.boardService.getRecentBoard();
    }

    @Get('search')
    getBoardByKeyword(@Query('keyword') keyword: string): Promise<BoardResponse[]> {
        return this.boardService.findByKeyword(keyword);
    }
}
