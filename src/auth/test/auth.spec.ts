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

    // When: 검증된 토큰으로 요청을 보내면
    // Then: true 를 반환한다.
    it ('Auth Token Validation (Post): When valid token is provided, then return isValid as true.', async () => {
        const loginRes = await request('/auth/login')
            .send({ password: process.env.ADMIN_PASSWORD });
        
        const validToken = loginRes.body.accessToken;

        const res = await request('/auth/token')
            .send({ token: validToken })

        expect(res.status).toBe(201)
        expect(res.body.isValid).toBe(true);
    })

    // When: 잘못된 토큰으로 요청을 보내면
    // Then: false 를 반환한다.
    it('Auth Token Validation (Post): When invalid token is provided, then return isValid as false.', async () => {
        const invalidToken = 'invalid.jwt.token';
        
        const res = await request('/auth/token')
            .send({ token: invalidToken });

        expect(res.status).toBe(201);
        expect(res.body.isValid).toBe(false);
    });
})