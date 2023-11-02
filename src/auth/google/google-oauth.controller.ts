import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

const whitelist = [
  "binghui.ho@visiongroup.co"
]
@ApiTags('Google-service')
@Controller('auth/google')
export class GoogleOauthController {
	constructor(
		@InjectRepository(User)
    private usersRepository: Repository<User>,
		private configService: ConfigService,
		private jwtAuthService: JwtAuthService
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

		const { accessToken, refreshToken } = await this.jwtAuthService.login(user);
		res.cookie('refreshToken', refreshToken);
    //redirect to private  landing page
		res.redirect(`http://localhost:8080/dashboard`)
		return { accessToken: accessToken, refreshToken: refreshToken };
	}
}
