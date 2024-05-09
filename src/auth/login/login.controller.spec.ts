import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

// Mocking the LoginService
const mockLoginService = {
    login: jest.fn(dto => Promise.resolve({
        access_token: 'mockAccessToken',
        refresh_token: 'mockRefreshToken'
    })),
};

describe('LoginController', () => {
    let controller: LoginController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: LoginService,
                    useValue: mockLoginService
                },
            ],
        }).compile();

        controller = module.get<LoginController>(LoginController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call loginService with expected params and return tokens', async () => {
        const dto = { email: 'rover@gmail.com', password: '12345678' };
        const result = await controller.login(dto);

        expect(mockLoginService.login).toHaveBeenCalledWith(dto);
        expect(result).toEqual({
            access_token: 'mockAccessToken',
            refresh_token: 'mockRefreshToken'
        });
    });

    it('should handle and return a HttpStatus.OK on successful login', async () => {
        const dto = { email: 'rover@gmail.com', password: '12345678' };
        const spy = jest.spyOn(mockLoginService, 'login').mockImplementation(() => Promise.resolve({
            access_token: 'mockAccessToken',
            refresh_token: 'mockRefreshToken'
        }));

        const result = await controller.login(dto);

        expect(spy).toHaveBeenCalledWith(dto);
        expect(result).toBeDefined();
        expect(result.access_token).toBeDefined();
        expect(result.refresh_token).toBeDefined();
    });

});
