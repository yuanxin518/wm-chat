import { Body, Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { ApiOperation } from '@nestjs/swagger';
import { AuthModel } from './model';
import { User } from 'src/schemas/User';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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

  @Post('update')
  @ApiOperation({ summary: '登录、注册' })
  async update(@Body() userDto: User, @Req() req: Request) {
    
    const token = req.headers['wm-chat-token'];

    const { username } = await this.jwtService.decode(token);
    const currentUser = await this.userService.findOne(username);
    const res = await this.userService.update(
      currentUser.username,
      userDto.username,
      userDto.password,
    );
    if (res.modifiedCount === 1) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
