import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    MongooseModule,
    TerminusModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}