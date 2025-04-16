import { request } from "src/spec.setup"

describe('auth controller', () => {

    // When: 로그인에 성공하면
    // Then: accessToken 을 반환한다.
    it ('Auth Login (Post): When login is successful then return accessToken.', async () => {
        const res = await request('/auth/login')
            .send({ password: process.env.ADMIN_PASSWORD });
            
        expect(res.status).toBe(201);
        expect(res.body.accessToken).toBeDefined();
    })

    // When: 로그인에 실패하면
    // Then: Unauthorized 401 에러를 반환한다.
    it ('Auth Login (Post): When login fails, UnauthorizedException is returned.', async () => {
        const res = await request('/auth/login')
            .send({ password: 1234567890 })

        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Unauthorized')
    })
})