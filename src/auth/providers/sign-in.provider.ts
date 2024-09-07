import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';


@Injectable()
export class SignInProvider {

  constructor(

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider

  ) { }

    public async signIn(signinDto: SigninDto) {
    // find the  the user using email ID, if not found throw an error

    let user = await this.usersService.findOneByEmail(signinDto.email);
    if (!user) {
      throw new UnauthorizedException(
        'The user does not exist, please check your email and try again.');
    }

    // compare password to encrypted password
    const isPasswordValid = await this.hashingProvider.comparePassword(
      signinDto.password,
        user.password
      );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'The password is incorrect, please check your password and try again.');
    }

    // send back JWT TOKEN but for now just return confirmation
    return true;


  }


}
