import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }


  @Post('sign-in')
  public async signIn(@Body() signinDto: SigninDto) {
    return this.authService.signIn(signinDto);
  }

  
  

  

}
