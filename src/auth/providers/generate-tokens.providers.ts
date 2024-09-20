import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

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
  public async signTokren<T>(userId: number, expiresIn: number, payload?: T){
    
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


}
