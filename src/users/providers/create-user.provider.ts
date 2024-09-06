import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {

  constructor(
    
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

  ) { }
  

  /**
   * The method to create a new user in the database.
   * @param createUserDto - The user object to create.
   * @returns The created user object.
   * @throws BadRequestException - If the user already exists.
   * @throws RequestTimeoutException - If there is an error connecting to the database.
   */
  public async createUser(createUserDto: CreateUserDto): Promise<User> {

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }

    // Hash the password
    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    // Create the user
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      // Save the user
      return await this.usersRepository.save(user);
    } catch (error) {
      // If there is an error connecting to the database
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }

    
  
    

}
