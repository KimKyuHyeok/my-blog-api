import { IsNotEmpty } from "class-validator";

export class BoardUpdateDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}