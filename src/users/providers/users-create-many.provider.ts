import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {

  constructor (private readonly datasource: DataSource) { }


   /**
    * 
    * @param createUserDto - array of CreateUserDto
    */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {

    let newUSers: User[] = [];
    // create Querry Runner Instance
    const queryRunner = this.datasource.createQueryRunner();

    try {
      // Connect Query Runner to Database
      await queryRunner.connect();
      // Start Transaction
      await queryRunner.startTransaction();
      
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to database');
    }

    
    try {
      
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user); // create new user
        let result = await queryRunner.manager.save(newUser); // save new user
        newUSers.push(result); // push new user to array
      }
      // If successful, Commit 
      await queryRunner.commitTransaction();// means  the transaction is commited to the db, it is successful transaction
      
    } catch (error) {
      // If unsuccessful, Rollback 
      await queryRunner.rollbackTransaction(); // even if a few user created, everthing is rolled back to initial state brfore you started off with the transaction

      throw new ConflictException('Could not complate the transaction', {
        description: String(error)
      });

    } finally {
      // Release connection : close db connection
      await queryRunner.release(); // no matter what happens, connection will be released
      // no need to add try catch here but if you want to add it you can
    }

    return newUSers;

  }
}
