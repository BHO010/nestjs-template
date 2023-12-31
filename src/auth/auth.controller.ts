import { Controller, HttpStatus, Res, Req, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { ApiErrorDecorator } from '../common/decorator/error/error.decorator'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { LoginDto } from './dto/login.dto'

import {JwtAccessAuthGuard} from "src/auth/jwt/access/jwt-auth.guard"
import {JwtRefreshAuthGuard} from "src/auth/jwt/refresh/jwt-auth.guard"
import { JwtAuthService } from './jwt/jwt-auth.service'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtAuthService: JwtAuthService
  ) {}

  
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    
    const tokens = await this.authService.login(loginDto)
    
    res.cookie('refresh_token', tokens.refresh_token);
    //redirect to private  landing page
		return tokens
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAccessAuthGuard)
  @Get('verify')
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, "TokenExpiredError: jwt expired || Error: No auth token")
  verify(@Req() req: Request) {
    return this.authService.getUser(req.user)
  }

  @ApiBearerAuth('Bearer')
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
