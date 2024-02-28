// redis.module.ts
import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

// 创建一个全局模块
@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        client.on('connect', () => console.log('Connected to Redis'));
        client.on('error', (error) => console.error('Redis error:', error));
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
