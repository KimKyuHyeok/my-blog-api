import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BoardCreateDto } from './dto/board.create.dto';
import { BoardUpdateDto } from './dto/board.update.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BoardResponse } from './response/board.response';
import { PrismaService } from 'nestjs-prisma';
import { BoardDeleteDto } from './dto/board.delete.dto';

@Injectable()
export class BoardService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: BoardCreateDto): Promise<BoardResponse> {
        try {
            const board = await this.prisma.board.create({
                data: { ...dto },
                
            })

            return new BoardResponse(board);
        } catch (error) {
            console.error('게시글 생성 실패 : ', error);
            throw new InternalServerErrorException('게시글 생성 중 오류가 발생했습니다.');
        }
    }

    async update(dto: BoardUpdateDto): Promise<BoardResponse> {
        try {
            const board = await this.prisma.board.update({
                where: { id: dto.id },
                data: { title: dto.title, content: dto.content }
            })

            return new BoardResponse(board);
        } catch (error) {
            console.error('게시글 수정 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 게시글을 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('게시글 수정 중 오류가 발생했습니다.')
        }
    }

    async delete(dto: BoardDeleteDto): Promise<BoardResponse> {
        try {
            const board = await this.prisma.board.update({
                where: { id: dto.id },
                data: { deleteYn: true }
            })

            return new BoardResponse(board);
        } catch (error) {
            console.error('게시글 삭제 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 게시글을 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('게시글 삭제 중 오류가 발생했습니다.')
        }
    }

    async findById(id: number): Promise<BoardResponse> {
        try {
            const board = await this.prisma.board.findUnique({
                where: { id, deleteYn: false }
            })

            await this.prisma.board.update({
                where: { id: board.id },
                data: { views: { increment: 1 } }
            })

            return new BoardResponse(board);
        } catch (error) {
            console.error('게시글 조회 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 게시글을 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('게시글 조회 중 오류가 발생했습니다.')
        }
    }

    async findByCategoryId(categoryId: number): Promise<BoardResponse[]> {
        try {
            const boards = await this.prisma.board.findMany({
                where: { categoryId, deleteYn: false }
            })

            return boards.map((board) => new BoardResponse(board))
        } catch (error) {
            console.error('게시글 조회 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 게시글을 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('게시글 조회 중 오류가 발생했습니다.')
        }
    }

    async findAll(): Promise<BoardResponse[]> {
        try {
            const boards = await this.prisma.board.findMany({
                where: { deleteYn: false }
            })

            return boards.map((board) => new BoardResponse(board))
        } catch (error) {
            console.error('게시글 조회 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 게시글을 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('게시글 조회 중 오류가 발생했습니다.')
        }
    }

    async findByKeyword(keyword: string): Promise<BoardResponse[]> {
        try {
            keyword = keyword.toLowerCase();

            const boards = await this.prisma.board.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: keyword,
                            }
                        },
                        {
                            content: {
                                contains: keyword
                            }
                        }
                    ],
                    deleteYn: false
                }
            })

            return boards.map((board) => new BoardResponse(board))
        } catch (error) {
            console.error('게시글 검색 실패 : ', error);
            throw new InternalServerErrorException('게시글 검색 중 오류가 발생했습니다.')
        }
    }
}
