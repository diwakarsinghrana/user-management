import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('UsersService', () => {
    let service: UsersService;
    let module: TestingModule;


    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken('User'),
                    useValue: {}
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    afterEach(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
