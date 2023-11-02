import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtAccessPayload } from '../common/types/types';
import { JwtAuthService } from './jwt/jwt-auth.service'
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
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

    return await this.jwtAuthService.login(user)

  }

  async googleLogin(user: User) {
    try {
      let isExist = await this.usersRepository.findOne({ where:
        { email: user.email }
      })
  
      if(!isExist) {
        await this.usersRepository.save(user)
      }
      return await this.jwtAuthService.login(user);
    }catch(e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, ) 
    }
  }

  async register(registerDto: RegisterDto) {
    let user = await this.usersRepository.findOne({ where:
      { email: registerDto.email }
    })

    if(user) {
      throw new BadRequestException("Email is already registered.")
    }else {
      let { password, ...rest } = registerDto
      console.log("salt", this.configService.get('auth.salt_rounds'))
      console.log("password", password)
      let passwordHash = bcrypt.hashSync(password, Number(this.configService.get('auth.salt_rounds')))
      return await this.usersRepository.save({
        ...rest,
        password: passwordHash
      })
    }
  }
 
  async getUser(payload: any) {
    let user = await this.usersRepository.findOne({ 
      select: {
        id: true,email: true,firstName: true,lastName: true, photo: true
      },
      where: { email: payload.email }
    })

    return user
  }
}
