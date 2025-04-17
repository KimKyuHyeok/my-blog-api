import { categoryFactory } from "src/category/category.factory";
import { BoardFactory } from "../board.factory";
import { adminToken } from "src/auth/admin.factory";
import { request, requestGet } from "src/spec.setup";

describe('board', () => {
    let token: any;
    let category: any;
    let board1: any;
    let board2: any;
    let deleteBoard: any;

    beforeEach(async () => {
        token = adminToken();
        category = await categoryFactory.create({ name: 'category '});
        board1 = await BoardFactory(category, 'test title-1', 'test kim content-1');
        board2 = await BoardFactory(category, 'test Kim title-2', 'test content-2');
        deleteBoard = await BoardFactory(category, 'test Kim title-3', 'test kim content-3', true);
    })

    // When: 데이터와 함께 게시글 생성 요청을 하면
    // Then: 201 상태코드와 생성된 데이터를 반환한다.
    it('Board Create (Post): When you request to create a post then returns a 201 status code and the generated data.', async () => {
        const res = await request('/board/create', token)
            .send({ categoryId: category.id ,title: '제목', content: '내용'})

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('제목');
        expect(res.body.content).toBe('내용');
    })

    // When: 수정 할 데이터와 함께 게시글 수정을 요청하면
    // Then: 201 상태코드와 수정된 데이터를 반환한다.
    it('Board Update (Post): When you request to edit a post then a 201 status code and the modified data are returned.', async () => {
        const res = await request('/board/update', token)
            .send({ id: board1.id, title: 'update title', content: 'update content'});

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('update title');
        expect(res.body.content).toBe('update content');
    })

    // When: 게시글 ID 와 함께 게시글 삭제 요청을 하면
    // Then: 201 상태코드와 삭제된 게시글의 ID 를 반환한다.
    it('Board Delete (Post): When you request to delete a post then a 201 status code and the deleted data are returned.', async () => {
        const res = await request('/board/delete', token)
            .send({ id: board1.id })

        expect(res.status).toBe(201);
        expect(res.body.id).toBe(board1.id);
    })

    // When: 인증되지 않은 유저가 게시글 생성을 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Board Create (Post): When an unauthenticated user requests to create a post then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/board/create')
            .send({ categoryId: category.id ,title: '제목', content: '내용'})

            expect(res.body.message).toBe('Unauthorized');
            expect(res.body.statusCode).toBe(401);
    })
    

    // When: 인증되지 않은 유저가 게시글 수정을 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Board Update (Post): When an unauthenticated user requests to update a post then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/board/update')
            .send({ id: board1.id, title: 'update title', content: 'update content'});

        expect(res.body.message).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
    })

    // When: 인증되지 않은 유저가 게시글 삭제를 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Board Delete (Post): When an unauthenticated user requests to delete a post then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/board/delete')
            .send({ id: board1.id })

        expect(res.body.message).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
    })

    // When: 게시글 id 와 함께 단일 게시글 조회를 요청하면
    // Then: 게시글 데이터를 반환한다.
    it('Board By Id (Get): When you request a single post search with boardId then post data is returned.', async () => {
        const res = await requestGet('/board/id')
            .query({ id: board1.id })

        expect(res.body.id).toBe(board1.id);
    })

    // When: 카테고리 id 로 게시글 조회 요청을 하면
    // Then: 카테고리 id 가 포함된 게시글들을 반환한다.
    it('Board By CategoryId (Get): When you request data with categoryId then data with categoryId will be returned.', async () => {
        const res = await requestGet('/board/categoryId')
            .query({ categoryId: category.id })

        expect(res.body).toHaveLength(2);
    })

    // When: 전체 게시글 조회를 요청하면
    // Then: 모든 게시글의 데이터를 반환한다.
    it('Board By All (Get): When you request to view all posts then all posts will be returned.', async () => {
        const res = await requestGet('/board/all')
        
        expect(res.body).toHaveLength(2);
    })

    // When: 키워드를 포함해 게시글 검색 요청을 하면
    // Then: 키워드가 포함된 데이터들을 반환한다.
    it('Board By Keyword (Get): When you request a keyword search then data containing the keyword is returned.', async () => {
        const res = await requestGet('/board/search')
            .query({ keyword: 'kim' })

        expect(res.body).toHaveLength(2);
    })
})