import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/schemas/User';
import * as Mongo from '.pnpm/mongodb@6.3.0/node_modules/mongodb';

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

  async findOneById(id: string): Promise<User | undefined> {
    const res = await this.userModel.findById(id);

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

  async findAll() {
    return await this.userModel.find();
  }

  async update(username: string, newUsername?: string, newPassword?: string) {
    return await this.userModel.updateOne(
      {
        username,
      },
      {
        username: newUsername,
        password: newPassword,
      },
    );
  }

  async deleteById(userId: string) {
    Mongo;
    return this.userModel.deleteOne({ _id: userId });
  }
}
