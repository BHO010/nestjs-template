import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entitiy'
import { JwtAccessPayload } from '../../common/types/types';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

type jwtRefreshPayload = {
	email
}

@Injectable()
export class JwtAuthService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async login(user: any) {
		const { firstName, lastName, email, photo } = user;
		const payload: JwtAccessPayload = {
			firstName,
			lastName,
			email,
			photo
		};
		
		const tokens = await this.getTokens(payload)
		
		return tokens
	}

	async refresh(user: any) {
		const { email } = user;
		let userData = await this.usersRepository.findOne({ where:
			{ email: email }
		})
		const payload: JwtAccessPayload = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
			photo: userData.photo
		};
		
		const tokens = await this.getTokens(payload)
		
		return {
			accessToken: tokens.accessToken
		}
	}

	async getTokens(data: JwtAccessPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        data,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
					email: data.email
				},
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
