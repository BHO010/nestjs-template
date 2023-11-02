import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

const whitelist = [
  "binghui.ho@visiongroup.co"
]

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private configService: ConfigService,
	) {
		super({
			clientID: configService.get<string>('auth.google.clientId'),
			clientSecret: configService.get<string>('auth.google.clientSecret'),
			callbackURL: configService.get<string>('auth.google.callbackURL'),
			scope: ['profile', 'email'],
		});
	}

	async validate(accessToken: string, _refreshToken: string, profile: Profile) {
		console.log("profile", profile)
    let user = new User()
    user.firstName = profile.name.givenName || ""
    user.lastName = profile.name.familyName || ""
    user.email = profile.emails[0].value
    user.googleId = profile.id
		user.photo = profile.photos[0].value || ""
    
    return user;
	}
}
