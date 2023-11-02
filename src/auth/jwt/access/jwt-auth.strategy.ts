import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAccessPayload } from '../../../common/types/types';

@Injectable()
export class JwtAccessAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private configService: ConfigService) {
		super({
			// available options: https://github.com/mikenicholson/passport-jwt#configure-strategy
			jwtFromRequest: ExtractJwt.fromExtractors([
				// Users can send us the JWT token either by a bearer token in an authorization header...
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				// ... or in a cookie named "jwt"
				//(request: Request) => request?.cookies?.jwt,
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('auth.jwt.accessSecret'),
		});
	}

	async validate(payload: JwtAccessPayload) {
		// For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
		// It then invokes our validate() method passing the decoded JSON as its single parameter.
		// Based on the way JWT signing works, we're guaranteed that we're receiving a valid token
		// that we have previously signed and issued to a valid user.
		// `payload` is that what JwtAuthService#login() has created and what thereafter
		// GithubOauthController#githubAuthCallback() has saved as cookie named "jwt".

		// Passport assigns the value we return from this method to the Request object as `req.user`.
		// AppController#getProfile() uses this as an example.
		const { firstName, lastName, email, photo } = payload;
		return payload //{ firstName, lastName, email, photo };
	}
}
