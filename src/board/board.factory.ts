import { defineBoardFactory } from "src/__generated__/fabbrica";

export async function BoardFactory(category: any, title: string, content: string, deleteYn?: boolean) {
    let board;
    if (deleteYn) {
        board = defineBoardFactory({
            defaultData: {
                title,
                content,
                category: {
                    connect: { id: category.id }
                },
                deleteYn: true
            }
        }).create();   
    } else {
        board = defineBoardFactory({
            defaultData: {
                title,
                content,
                category: {
                    connect: { id: category.id }
                }
            }
        }).create();
    }
    
    return board;
}