import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)  
  @MaxLength(40)
  firstName: string;
  
  @IsString()
  @IsOptional()
  @MinLength(3)  
  @MaxLength(40)
  lastName: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Minimum eight characters, at least one letter, one number and one special character' })
  password: string;

}