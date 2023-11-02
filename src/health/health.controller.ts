import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Healthcheck')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
