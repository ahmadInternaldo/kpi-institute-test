import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginInterface } from './interfaces/response-login.interface';
import { LogoutDto } from './dto/logout.dto';
import { ResponseLogoutInterface } from './interfaces/response-logout.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginInterface> {
    return this.authService.login(loginDto);
  }

  @Get('logout')
  async logout(@Query() query: LogoutDto): Promise<ResponseLogoutInterface> {
    return this.authService.logout(query);
  }
}
