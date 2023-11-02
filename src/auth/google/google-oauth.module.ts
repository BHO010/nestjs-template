import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { User } from '../../entities/user.entity';
import { AuthService } from '../auth.service';

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtAuthModule],
	controllers: [GoogleOauthController],
	providers: [GoogleOauthStrategy, AuthService],
})
export class GoogleOauthModule {}