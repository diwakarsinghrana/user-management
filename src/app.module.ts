import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/schemas/user.schema';
import { BlockController } from './block/block.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://diwakar:3WqnlVGwxXsiAgwr@cluster0.vdccslc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CacheModule.register({
      max: 100,
      ttl: 0,
    })
  ],
  controllers: [UsersController, BlockController],
  providers: [UsersService],
})
export class AppModule { }


