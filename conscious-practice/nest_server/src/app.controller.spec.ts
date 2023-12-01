import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  describe('[GET] /post', () => {
    it('should return "Post Page"', () => {
      // given

      // expect(given + then)
      expect(controller.getPost()).toBe('Post Page');
    });
  });

  describe('[GET] /user', () => {
    it('should return "User Page"', () => {
      // given

      // expect(given + then)
      expect(controller.getUser()).toBe('User Page');
    });
  });
});
