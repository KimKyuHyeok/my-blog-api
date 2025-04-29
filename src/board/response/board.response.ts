import { Board } from "../model/board.model.dto";

export class BoardResponse {
    id: number;
    title: string;
    content: string;
    views: number;
    categoryId: number;

    constructor(board: Board) {
        this.id = board.id;
        this.title = board.title;
        this.content = board.content;
        this.views = board.views;
        this.categoryId = board.categoryId;
    }
}