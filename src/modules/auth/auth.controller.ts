import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from 'src/schemas/User';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  signIn(@Body() signInDto: User) {
    let res = null;
    try {
      res = this.authService.signIn(signInDto.username, signInDto.password);
      return res;
    } catch (err) {
      console.log(err);
    }
    return {
      success: false,
    };
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '获取登录的用户信息' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
