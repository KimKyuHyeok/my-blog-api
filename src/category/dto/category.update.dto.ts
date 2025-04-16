import { IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;
}