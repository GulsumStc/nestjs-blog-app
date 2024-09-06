import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService) { }

  public signIn(signinDto: SigninDto) {

    // find the  the user using email ID, if not found throw an error
    // compare password to encrypted password
    // send back JWT TOKEN but for now just return confirmation
    
    return 'SAMPLE_TOKEN';

  }

  public isAuthenticated() {
    return true;
  }


}
