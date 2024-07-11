import { Injectable, NotFoundException, BadRequestException, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    async getUserById(id: string): Promise<User> {
        const cachedUser: string = await this.cacheManager.get(`user:${id}`);
        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.cacheManager.set(`user:${id}`, JSON.stringify(user));

        return user;
    }

    async getAllUsers(): Promise<UserDocument[]> {
        const cachedUser: string = await this.cacheManager.get(`users`);
        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const result = await this.userModel.find({ blocked: false });
        await this.cacheManager.set(`users`, JSON.stringify(result));

        return result;
    }

    async searchUsers(username?: string, minAge?: number, maxAge?: number): Promise<User[]> {
        const filters: any = { blocked: false };

        if (username) {
            filters.username = { $regex: username, $options: 'i' };
        }

        if (minAge || maxAge) {
            filters.birthdate = {};
            if (minAge) {
                filters.birthdate.$lte = new Date(new Date().setFullYear(new Date().getFullYear() - minAge));
            }
            if (maxAge) {
                filters.birthdate.$gte = new Date(new Date().setFullYear(new Date().getFullYear() - maxAge));
            }
        }

        const cachedUser: string = await this.cacheManager.get(`user:${filters}`);
        if (cachedUser) {
            console.log(cachedUser)
            return JSON.parse(cachedUser);
        }

        const result = await this.userModel.find(filters).exec();
        await this.cacheManager.set(`user:${filters}`, JSON.stringify(result));

        return result;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const createdUser = new this.userModel(createUserDto);
            return await createdUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Duplicate username');
            }
            throw new BadRequestException(error.message);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }
        return deletedUser;
    }

    async blockUser(userId: string): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }

        user.blocked = true;
        await user.save();

        return user;
    }

    async unblockUser(userId: string): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }

        user.blocked = false;
        await user.save();

        return user;
    }
}
