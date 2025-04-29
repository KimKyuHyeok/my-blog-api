import { IsNotEmpty } from "class-validator";

export class BoardDeleteDto {

    @IsNotEmpty()
    id: string;
}