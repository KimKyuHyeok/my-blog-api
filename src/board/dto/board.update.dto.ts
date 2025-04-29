import { IsNotEmpty } from "class-validator";

export class BoardUpdateDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}