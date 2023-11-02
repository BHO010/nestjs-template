import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { User } from '../../entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtAuthModule],
	controllers: [GoogleOauthController],
	providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}