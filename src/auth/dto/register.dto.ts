import { ApiProperty, ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({example: "john"})
  @IsNotEmpty()
  firstName: string

  @ApiProperty({example: "doe"})
  @IsNotEmpty()
  lastName: string

  @ApiProperty({example: "test@test.com"})
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({example: "test"})
  @IsNotEmpty()
  password: string
}