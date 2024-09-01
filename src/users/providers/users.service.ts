import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";

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

    @Inject(profileConfig.KEY)
    private readonly profileConfigration: ConfigType<typeof profileConfig>,
    
    /* injecting UsersCreateManyProvider */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,


  
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


    // test the new config
    console.log(this.profileConfigration);

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


  /**
   * The method to create many users in the database.
   * @param {CreateUserDto[]} createUsersDto - The array of user objects to create.
   * @returns {Array<Object>} An array of created user objects.
   * */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }


}
