import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { RedisClientType } from 'redis';
import config from 'src/configs/config';

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

    const payload = { userId: user.userId, userName: user.username };

    // 判断是否已经登录
    if (await this.checkUserIsLogin(username)) {
      return '已经登录，不能重复登录';
    }
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

  /** 检查缓存是否已经存在登录的用户 */
  async checkUserIsLogin(username: string): Promise<any> {
    const token = await this.redisClient.get(username);
    if (token) {
      return true;
    }
    return false;
  }
}
