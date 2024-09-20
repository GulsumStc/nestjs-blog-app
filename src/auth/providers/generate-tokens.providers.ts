import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProviders {


  constructor(

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,

  ) { }


  /**
   *  This method signs a new token with the given payload and expiration time.
   *
   * @param userId The user ID to sign the token for.
   * @param expiresIn The time in seconds the token should be valid.
   * @param payload Optional payload to include in the token.
   * @returns The signed token.
   */
  public async signToken<T>(userId: number, expiresIn: number, payload?: T){
    
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        audience: this.jwtConfigration.audience,
        issuer: this.jwtConfigration.issuer,
        secret: this.jwtConfigration.secret,
        expiresIn,
      }
    )
    return refreshToken;  
   
  }


  public async generateTokens(user: User) {

    /* Using Promise.all allows you to initiate multiple asynchronous operations simultaneously and wait for all of them to complete. */
  const [accessToken, refreshToken] =  await Promise.all([

      // generate The access token
      /* ActiveUserData is an interface that defines the structure of the user data  which are sub and email
        by using Partial<ActiveUserData> we are able to pass only the email
       */
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfigration.accessTokenTTL, { email: user.email }),

      // genreate The refresh token
      this.signToken(user.id, this.jwtConfigration.refreshTokenTTL)


  ])
    
    return {
      accessToken,
      refreshToken
    }

  }


}
