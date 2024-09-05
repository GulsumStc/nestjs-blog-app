import { forwardRef, Module } from '@nestjs/common';
import { AuthService} from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingProvider, BcryptProvider],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService],
})
export class AuthModule {}
