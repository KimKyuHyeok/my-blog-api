import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { DeleteCategoryDto } from './dto/category.delete.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: { ...dto }
            })
    
            return category;
        } catch (error) {
            console.error('카테고리 생성 실패 : ', error);
            throw new InternalServerErrorException('카테고리 생성 중 오류가 발생했습니다.');
        }
    }

    async update(dto: UpdateCategoryDto) {
        try {
            const category = await this.prisma.category.update({
                where: { id: dto.id },
                data: { name: dto.name }
            })

            return category;
        } catch (error) {
            console.error('카테고리 수정 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 카테고리를 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('카테고리 수정 중 오류가 발생했습니다.')
        }
    }

    // Board 작업 후 카테고리 삭제 시 Board 또한 삭제 처리될 수 있게 수정 작업 예정
    async delete(dto: DeleteCategoryDto) {
        try {
            await this.prisma.category.delete({
                where: { id: dto.id }
            })

            return '카테고리가 성공적으로 삭제되었습니다.'
        } catch (error) {
            console.error('카테고리 삭제 실패 : ', error);

            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`해당 ID의 카테고리를 찾을 수 없습니다.`);
            }

            throw new InternalServerErrorException('카테고리 삭제 중 오류가 발생했습니다.')
        }
    }

    async findAll() {
        const categories = await this.prisma.category.findMany();
        return categories;
    }
}
