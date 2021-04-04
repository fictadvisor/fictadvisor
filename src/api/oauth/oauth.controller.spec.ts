import { Test, TestingModule } from '@nestjs/testing';
import { OAuthController } from './oauth.controller';

describe('OAuthController', () => {
  let controller: OAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthController],
    }).compile();

    controller = module.get<OAuthController>(OAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
