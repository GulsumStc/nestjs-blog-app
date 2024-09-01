import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";

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
    private readonly privateConfigration: ConfigType<typeof profileConfig>,
    
     /* inject Datasource */
    private readonly datasource: DataSource
  
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
    console.log(this.privateConfigration);

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


  public async createMany(createUserDto: CreateUserDto[]) {

    let newUSers: User[] = [];

    // create Querry Runner Instance
      const queryRunner = this.datasource.createQueryRunner();
    // Connect Query Runner to Database
    await queryRunner.connect();
    // Start Transaction
    await queryRunner.startTransaction();
    try {
      
      for (let user of createUserDto) { 
        let newUser = queryRunner.manager.create(User, user); // create new user
        let result = await queryRunner.manager.save(newUser); // save new user
        newUSers.push(result); // push new user to array
      }
      // If successful, Commit 
      await queryRunner.commitTransaction();// means  the transaction is commited to the db, it is successful transaction
      
    } catch (error) {
      // If unsuccessful, Rollback 
      await queryRunner.rollbackTransaction(); // even if a few user created, everthing is rolled back to initial state brfore you started off with the transaction

    } finally {
      // Release connection : close db connection
      await queryRunner.release(); // no matter what happens, connection will be released
      
    }
    
    

  }


}
