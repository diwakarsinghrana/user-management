import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users/schemas/user.schema';
import { BlockController } from './block/block.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import * as redis from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register({
      max: 100,
      store: redis,
      host: 'localhost',
      port: 6379,
      isGlobal: true
    }),
    UsersModule
  ],
  controllers: [BlockController]
})
export class AppModule { }


