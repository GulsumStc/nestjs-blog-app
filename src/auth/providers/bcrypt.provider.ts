import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {

  // Hash a given password with a generated salt
  public async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();  // Generate a salt
    return bcrypt.hash(password, salt);   // Hash the password with the salt
  }

  // Compare a plain text password with a hashed password
  public comparePassword(plainTextPassword: string | Buffer, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
