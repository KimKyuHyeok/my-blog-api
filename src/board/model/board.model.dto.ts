import { IsNotEmpty } from "class-validator";


export class Board {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    views: number;

    @IsNotEmpty()
    deleteYn: boolean;

    @IsNotEmpty()
    createdAt: Date;
    
    @IsNotEmpty()
    updatedAt: Date;
}