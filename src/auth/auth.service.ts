import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(password: string) {
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

        if (password !== adminPassword) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
        }

        const payload = { role: 'admin' };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
        });

        return { accessToken };
    }
}
