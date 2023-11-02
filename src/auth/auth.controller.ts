import { Controller, HttpStatus, Res, Req, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiErrorDecorator } from '../common/decorator/error/error.decorator'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.Dto'

import {JwtAccessAuthGuard} from "src/auth/jwt/access/jwt-auth.guard"
import {JwtRefreshAuthGuard} from "src/auth/jwt/refresh/jwt-auth.guard"
import { JwtAuthService } from './jwt/jwt-auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtAuthService: JwtAuthService
  ) {}

  
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    
    const {accessToken, refreshToken} = await this.authService.login(loginDto)
    
    res.cookie('refreshToken', refreshToken);
    //redirect to private  landing page
		return { accessToken: accessToken, refreshToken: refreshToken };
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('verify')
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, "TokenExpiredError: jwt expired || Error: No auth token")
  verify(@Req() req: Request) {
    return this.authService.getUser(req.user)
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  @ApiOperation({
    summary: 'Refresh JWT token',
  })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, "TokenExpiredError: jwt expired || Error: No auth token")
  refresh(@Req() req: Request) {
    const decoded:any  = req.user
    return this.jwtAuthService.refresh(decoded);
  }
}
