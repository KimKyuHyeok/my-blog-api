import { Board } from "@prisma/client";

export class RecentBoard {
  id: number;
  title: string;

  constructor(board: Pick<Board, 'id' | 'title'>) {
    this.id = board.id;
    this.title = board.title;
  }
}
