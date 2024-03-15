import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/schemas/User';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const res = await this.userModel.findOne({ username });
    if (!res) return null;

    return {
      userId: res._id.toString(),
      username: res.username,
      password: res.password,
    };
  }

  async createOne(username: string, password: string) {
    return await this.userModel.create({ username, password });
  }
}
