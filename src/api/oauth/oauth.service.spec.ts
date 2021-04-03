import { Test, TestingModule } from '@nestjs/testing';
import { OAuthService } from './oauth.service';

describe('OAuthService', () => {
  let service: OAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OAuthService],
    }).compile();

    service = module.get<OAuthService>(OAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
