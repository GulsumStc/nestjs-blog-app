import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { generate } from 'rxjs';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensProviders } from './generate-tokens.providers';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokenProvider {

  constructor(

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProviders,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService

  ) { }


  /**
   * This method generates fresh access tokens using the refresh token. 
   * 
   * @param refreshTokenDto The refresh token dto containing the refresh token.
   * @returns The new access token and refresh token.
   */
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {

      // Verify the refresh token using the jwt service.
      // Pick<ActiveUserData, 'sub'> creates a new type that only includes the sub property from the ActiveUserData interface.
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
        refreshTokenDto.refreshToken,
        this.jwtConfigration,
      );

      // Fetch user from the database.
      const user = await this.usersService.findOneById(sub);

      // Generate tokens.
      return await this.generateTokensProvider.generateTokens(user);

    } catch (error) {
      throw new UnauthorizedException(error, {
        description: 'Could not refresh access token',
      });
    }
  }
}