import { ConfigService } from '@nestjs/config';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { User } from 'src/database/entities/user.entity';

export const JwtModule = _JwtModule.registerAsync({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('security.secret'),
    signOptions: {
      expiresIn: config.get<string>('security.jwt.ttl'),
    },
  }),
});
