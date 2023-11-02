import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtAccessPayload } from '../common/types/types';
import { JwtAuthService } from './jwt/jwt-auth.service'
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.Dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
     private usersRepository: Repository<User>,
     private jwtAuthService: JwtAuthService,
     private configService: ConfigService
   ) {}

  async login(loginDto: LoginDto) {
    let user = await this.usersRepository.findOne({ where:
      { email: loginDto.email }
    })

    if (!user) {
      throw new BadRequestException("Incorrect credentials")
    }

    const password = loginDto.password

    if(!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException("Incorrect credentials")
    }

    const { accessToken, refreshToken } = await this.jwtAuthService.login({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo
    })

    return { accessToken: accessToken, refreshToken: refreshToken }
  }

  async register(registerDto: RegisterDto) {
    let user = await this.usersRepository.findOne({ where:
      { email: registerDto.email }
    })

    if(user) {
      throw new BadRequestException("Email is already registered.")
    }else {
      let { password, ...rest } = registerDto

      return await this.usersRepository.save({
        ...rest,
        password: bcrypt.hashSync(password, this.configService.get('auth.salt_rounds'))
      })
    }
  }
 
  async getUser(payload: any) {
    let user = await this.usersRepository.findOne({ where:
      { email: payload.email }
    })

    return user
  }
}
