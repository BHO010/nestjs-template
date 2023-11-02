import 'dotenv/config'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SqlModule } from './database/sql.module';
import { MongoModule } from './database/mongo.module';
import configuration from './config/configuration';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { GoogleOauthModule } from './auth/google/google-oauth.module';

@Module({
  imports: [
    SqlModule,
    MongoModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }), 
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    AuthModule,
    GoogleOauthModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}