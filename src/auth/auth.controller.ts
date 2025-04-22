import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body('password') password: string) {
        return this.authService.login(password);
    }

    @Post('token')
    validateToken(@Body('token') token: string): { isValid: boolean } {
        const isValid = this.authService.validToken(token);

        return { isValid };
    }
}
