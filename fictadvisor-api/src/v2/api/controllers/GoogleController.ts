import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { GoogleAuthService } from '../../google/GoogleAuthService';

@ApiTags('Google')
@Controller({
  version: '2',
  path: '/google',
})
export class GoogleController {
  constructor (
    private googleAuthService: GoogleAuthService,
  ) {}

}
