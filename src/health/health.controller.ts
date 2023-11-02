import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Healthcheck')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mysql: TypeOrmHealthIndicator,
    private mongo: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      () => this.mysql.pingCheck('mysql'),
      () => this.mongo.pingCheck('mongo'),
    ]);
  }
}
