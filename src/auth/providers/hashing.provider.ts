import { Injectable } from '@nestjs/common';

/**
 * Abstract class `HashingProvider` defines the contract for password hashing and comparison.
 *
 * By using an abstract class:
 * 1. **Encapsulation of Logic:** You define the methods (`hashPassword` and `comparePassword`) that any concrete implementation must provide, without specifying how these methods should be implemented.
 * 2. **Code Reusability:** Different hashing algorithms (like bcrypt, Argon2, etc.) can extend this class, providing their own implementation of the methods, while adhering to a common interface.
 * 3. **Flexibility:** It allows you to easily switch between different hashing strategies by changing the concrete implementation without altering the rest of your application.
 * 4. **Consistency:** Ensures that all concrete classes implementing `HashingProvider` will have the required methods, promoting a consistent approach to password management across your application.
 *
 * ! Example usage:
 * - `BcryptProvider` or `Argon2Provider` can extend this class and provide the specific details of how passwords are hashed and compared.
 */
@Injectable()
export abstract class HashingProvider {


  abstract hashPassword(password: string | Buffer): Promise<string>;


  abstract comparePassword(plainTextPassword: string | Buffer, hashedPassword: string): Promise<boolean>;

}
