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

import { ApiOperation } from '@nestjs/swagger';
import { MessageService } from '../message/message.service';
import { AuthModel } from './model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录、注册' })
  async signIn(@Body() signInDto: AuthModel) {
    let res = null;
    try {
      if (signInDto.isRegistry) {
        res = await this.authService.signUp(
          signInDto.username,
          signInDto.password,
        );
      } else {
        res = await this.authService.signIn(
          signInDto.username,
          signInDto.password,
        );
      }
      return res;
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '获取登录的用户信息' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
