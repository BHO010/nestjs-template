import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtAccessAuthStrategy } from './jwt/access/jwt-auth.strategy';
import { JwtRefreshAuthStrategy } from './jwt/refresh/jwt-auth.strategy';
import { JwtAuthService } from './jwt/jwt-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [JwtAuthService, AuthService, JwtAccessAuthStrategy, JwtRefreshAuthStrategy],
})
export class AuthModule {}
