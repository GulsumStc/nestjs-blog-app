import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService } from "@nestjs/config";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable() // All providers must be decorated with @Injectable
export class UsersService {

  /**
   * Constructor to inject dependencies.
   * @param {AuthService} usersService - The authentication service to check user authentication.
   */
  constructor(
    /* injecting User Repository */
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly configService:ConfigService
  
  ) { }


  public async createUser(createUserDto: CreateUserDto) {
    
    // check if user exists with same email
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } })
    // handle some exception
       //......
    // create user
    let newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;

  }


  /**
   * The method to get all users from the database.
   * @param {GetUsersParamDto} getUsersParamDto - The parameters for filtering users.
   * @param {number} limit - The number of users to retrieve per page.
   * @param {number} page - The page number to retrieve.
   * @returns {Array<Object>} An array of user objects.
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number
  ) {


    /* All the value inside the enviroment variable are strings by default  */
    const enviroment = this.configService.get<string>('S3_BUCKET');
    console.log(enviroment)

    return [
      {
        firstName: 'John',
        email: 'j@j.com'
      },
      {
        firstName: 'Jane',
        email: 'j@j.com'
      }
    ]
  }

  /**
   * The method to get one user from the database by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Object} The user object with the specified ID.
   */
  public async findOneById(id: number) {
    
    const user = await this.userRepository.findOneBy({ id });
    return user;

  }
}
