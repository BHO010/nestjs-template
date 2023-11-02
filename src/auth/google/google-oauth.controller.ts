import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';

@ApiTags('Google')
@Controller('auth/google')
export class GoogleOauthController {
	constructor(
		@InjectRepository(User)
    private usersRepository: Repository<User>,
		private configService: ConfigService,
		private jwtAuthService: JwtAuthService,
		private authService: AuthService
	) {}

	@Get()
	@UseGuards(GoogleOauthGuard)
	async googleAuth() {
	}

	@Get('callback')
	@UseGuards(GoogleOauthGuard)
	async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		// Passport automatically creates a `user` object, based on the return value of our
		// GoogleOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

		const user = req.user as any;
		console.log("user", user)
		const tokens = await this.authService.googleLogin(user);
		res.cookie('refresh_token', tokens.refresh_token);
    //redirect to private  landing page
		if(this.configService.get('redirect_uri')) {
			res.redirect(this.configService.get('redirect_uri'))
		}
		
		return tokens
	}
}
