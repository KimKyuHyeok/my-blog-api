import { JwtService } from "@nestjs/jwt";

export function adminToken(): string {
    const jwtService = new JwtService({
        secret: process.env.JWT_SECRET!,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    });

    const payload = {
        role: 'admin'
    }

    return jwtService.sign(payload);
}