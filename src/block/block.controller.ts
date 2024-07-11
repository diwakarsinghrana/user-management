import { Controller, Post, Delete, Param } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('block')
export class BlockController {
    constructor(private readonly usersService: UsersService) { }

    @Post(':id')
    async blockUser(@Param('id') id: string) {
        return await this.usersService.blockUser(id);
    }

    @Delete(':id')
    async unblockUser(@Param('id') id: string) {
        return await this.usersService.unblockUser(id);
    }
}


