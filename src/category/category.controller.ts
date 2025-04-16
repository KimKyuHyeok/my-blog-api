import { CategoryService } from './category.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.create.dto';
import { JwtAuthGuard } from 'src/config/auth.guard';
import { AdminGuard } from 'src/config/admin.guard';
import { UpdateCategoryDto } from './dto/category.update.dto';
import { DeleteCategoryDto } from './dto/category.delete.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    
    @UseGuards(JwtAuthGuard ,AdminGuard)
    @Post('/create')
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @UseGuards(JwtAuthGuard ,AdminGuard)
    @Post('/update')
    update(@Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(dto);
    }

    @UseGuards(JwtAuthGuard ,AdminGuard)
    @Post('/delete')
    delete(@Body() dto: DeleteCategoryDto) {
        return this.categoryService.delete(dto);
    }

    @Get('/categories')
    findAll() {
        return this.categoryService.findAll();
    }
}
