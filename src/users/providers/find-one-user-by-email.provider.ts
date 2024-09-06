import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {

  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  /**
   * The method to find one user from the database by email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {User | null} The user object with the specified email, or null if not found.
   */
  public async findOneByEmail(email: string): Promise<User | null> {

    let user: User | undefined = undefined;

    try {
     user = await this.userRepository.findOneBy({ email });
      
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: `Could not connect to database`,
      })
    }


    // if user not found
    if (!user) {
      throw new UnauthorizedException(
        'The user does not exist, please check your email and try again.',
      );
    }

    return user;
  }



  

}
