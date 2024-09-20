import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,

    private readonly refreshTokensProvider: RefreshTokenProvider


  ) { }

  public signIn(signinDto: SigninDto) {
    return this.signInProvider.signIn(signinDto);

  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {

    return this.refreshTokensProvider.refreshToken(refreshTokenDto);
  }

}
