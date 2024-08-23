import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";

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
     @Inject(forwardRef(() => AuthService))
     private readonly usersService: AuthService){ }


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
    const isAuthenticated = this.usersService.isAuthenticated();
    console.log(isAuthenticated);

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
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Alice',
      amail: 'a@a.com'
    };
  }
}
