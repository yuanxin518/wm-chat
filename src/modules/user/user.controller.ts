import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthModel } from '../auth/model';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/User';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('info')
  @ApiOperation({ summary: '获取用户信息' })
  async info(@Body() userModel: AuthModel) {
    const user = await this.userService.findOneById(userModel.userId);

    if (!user)
      return {
        success: false,
        data: null,
        type: userModel.type,
      };

    return {
      success: true,
      data: {
        userId: user.userId,
        username: user.username,
        type: userModel.type,
      },
    };
  }

  @Post('friend')
  @ApiOperation({ summary: '获取好友列表' })
  async getFriends(@Req() req: Request) {
    const token = req.headers['wm-chat-token'];

    const { username } = await this.jwtService.decode(token);
    const currentUser = await this.userService.findOne(username);
    const user = await this.userService.findAll();

    if (!currentUser || !currentUser.userId)
      return {
        success: false,
        data: null,
      };
    const friends = user
      .filter((item) => item._id.toString() !== currentUser.userId)
      .map((item) => {
        return {
          userId: item._id.toString(),
          username: item.username,
          type: 'user',
        };
      });

    if (!user)
      return {
        success: false,
        data: null,
      };

    return {
      success: true,
      data: friends,
    };
  }

  @Post('deleteUser')
  @ApiOperation({ summary: '删除用户' })
  async deleteUser(@Body() userModel: User) {
    const id = userModel.userId;

    const res = await this.userService.deleteById(id);
    console.log(res);
    if (res.deletedCount === 1) {
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
