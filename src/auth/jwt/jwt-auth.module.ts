import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthService } from './jwt-auth.service';
import { JwtAccessAuthStrategy } from './access/jwt-auth.strategy';
import { JwtRefreshAuthStrategy } from './refresh/jwt-auth.strategy';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('auth.jwt.secret'),
				signOptions: { expiresIn: configService.get<number>('auth.jwt.expiresInSeconds') },
			}),
			inject: [ConfigService],
		}),
		JwtModule.register({}),
		TypeOrmModule.forFeature([User]),
	],
	providers: [JwtAuthService, JwtAccessAuthStrategy, JwtRefreshAuthStrategy],
	exports: [JwtAuthService],
})
export class JwtAuthModule {}
