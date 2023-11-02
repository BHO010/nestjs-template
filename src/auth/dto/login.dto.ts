import { ApiProperty, ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: "test@test.com"})
  @IsNotEmpty()
  @IsEmail()
  email?: string

  @ApiProperty({example: "test"})
  @IsNotEmpty()
  password?: string
}