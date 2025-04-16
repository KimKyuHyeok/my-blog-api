import { adminToken } from 'src/auth/admin.factory';
import { request, requestGet } from 'src/spec.setup'
import { categoryFactory } from '../category.factory';


describe('category controller', () => {
    let category: any;
    let token: any;

    beforeEach(async () => {
        category = await categoryFactory.create();
        await categoryFactory.create({ name: 'NestJS' })
        token = await adminToken();
    })

    // When: 권한이 없는 사용자가 카테고리 생성을 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Category Create (Post): When an unauthorized user requests to create a category then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/category/create')
            .send({ name: 'test category' })

        expect(res.body.message).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
    })

    // When: 권한이 없는 사용자가 카테고리 수정을 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Category Update (Post): When an unauthorized user requests to update a category then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/category/update')
            .send({ id: category.id ,name: '수정카테고리' })

        expect(res.body.message).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
    })

    // When: 권한이 없는 사용자가 카테고리 삭제을 요청하면
    // Then: 401 상태코드와 Unauthorized 메시지를 반환한다.
    it('Category Delete (Post): When an unauthorized user requests to delete a category then 401 status code and an Unauthorized message are returned.', async () => {
        const res = await request('/category/delete')
        .send({ id: category.id })

        expect(res.body.message).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
    })

    // When: 카테고리 생성 요청을 전달하면
    // Then: 201 상태코드를 반환한다.
    it('Category Create (Post): When you send a category creation request then returns status code 201.', async () => {
        const res = await request('/category/create', token)
            .send({ name: 'test category' });

        expect(res.status).toBe(201);
    })

    // When: 카테고리 수정 요청을 전달하면
    // Then: 201 상태코드와 수정 된 이름을 반환한다.
    it('Category Update (Post): When you send a request to modify a category then returns a 201 status code and the modified name.', async () => {
        const res = await request('/category/update', token)
            .send({ id: category.id ,name: '수정카테고리' })

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('수정카테고리')
    })

    // When: 카테고리 삭제 요청을 전달하면
    // Then: 201 상태코드와 성공 메시지를 반환한다.
    it('Category Delete (Post): When you send a request to delete a category then returns a 201 status code and a success message.', async () => {
        const res = await request('/category/delete', token)
            .send({ id: category.id })

        expect(res.status).toBe(201);
        expect(res.text).toBe('카테고리가 성공적으로 삭제되었습니다.')
    })

    // When: 카테고리 목록을 요청하면
    // Then: 카테고리 리스트를 반환한다.
    it('Category findAll (Get): When you request a list of categories then returns a list of categories.', async () => {
        const res = await requestGet('/category/categories')

        expect(res.body).toHaveLength(2)
    })
})