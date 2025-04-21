import { BoardResponse } from "./board.response";

export class CategoryAndBoardResponse {
    id: number;
    name: string;
    boards: BoardTitle[];
}


class BoardTitle {
    id: number;
    title: string;
}