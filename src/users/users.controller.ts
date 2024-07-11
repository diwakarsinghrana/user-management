import { Controller, Get, Param, Query, Post, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('search')
    async searchUsers(@Query('username') username?: string, @Query('minAge') minAge?: string, @Query('maxAge') maxAge?: string): Promise<User[]> {
        const minAgeNum = minAge ? parseInt(minAge, 10) : undefined;
        const maxAgeNum = maxAge ? parseInt(maxAge, 10) : undefined;
        return this.usersService.searchUsers(username, minAgeNum, maxAgeNum);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        console.log(id)
        return await this.usersService.getUserById(id);
    }


    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }
}
