import { IsNotEmpty } from "class-validator";

export class BoardCreateDto {

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}