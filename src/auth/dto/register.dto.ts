import { ApiProperty, ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({example: "test@test.com"})
  @IsNotEmpty()
  firstName: string

  @ApiProperty({example: "test@test.com"})
  @IsNotEmpty()
  lastName: string

  @ApiProperty({example: "test@test.com"})
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({example: ""})
  @IsNotEmpty()
  password: string
}