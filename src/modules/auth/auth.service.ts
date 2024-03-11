import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { RedisClientType } from 'redis';
import config from 'src/configs/config';
import { User } from 'src/schemas/User';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClientType,
  ) {}

  /**
   * 登入
   * @param username 用户名
   * @param password 密码
   * @returns
   */
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = user;

    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });

    // 缓存设置token;
    await this.redisClient.set(username, access_token, {
      EX: config.LOGIN_EXPIRE,
    });

    return {
      access_token,
    };
  }

  /**
   * 校验token是否正常，并且处于登录状态
   * @param token
   */
  async varifyLoginByToken(token: string) {
    const data = this.jwtService.decode(token) as User;

    if (!data.username) {
      return false;
    }
    const existentToken = await this.redisClient.get(data.username);

    if (existentToken !== token) {
      return false;
    }
    return true;
  }
}
