import { forwardRef, Module } from '@nestjs/common';
import { AuthService} from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProviders } from './providers/generate-tokens.providers';
import { RefteshTokenProvider } from './providers/reftesh-token.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: HashingProvider,
    useClass: BcryptProvider
  }, SignInProvider, GenerateTokensProviders, RefteshTokenProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig), // now jwtConfig is available to this module  and can accessable via  help of @InjectConfig() decorator
    JwtModule.registerAsync(jwtConfig.asProvider()) // asProvider helps you to avoid passing jwtConfig in every provider/ avoid writing extra boilerplate code  
    // jwt module is injected into your application
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
