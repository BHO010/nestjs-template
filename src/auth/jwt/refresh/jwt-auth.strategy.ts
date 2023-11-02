import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAccessPayload } from '../../../common/types/types';

@Injectable()
export class JwtRefreshAuthStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
	constructor(private configService: ConfigService) {
		super({
			// available options: https://github.com/mikenicholson/passport-jwt#configure-strategy
			jwtFromRequest: ExtractJwt.fromExtractors([
				// Users can send us the JWT token either by a bearer token in an authorization header...
				//ExtractJwt.fromAuthHeaderAsBearerToken(),
				// ... or in a cookie named "jwt"
				(request: Request) => request?.cookies?.refreshToken,
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('auth.jwt.refreshSecret'),
      passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any) {
		const { email } = payload;
		return { email };
	}
}
