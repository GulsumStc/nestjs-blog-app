import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {

  hashPassword(password: string | Buffer): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
  comparePassword(plainTextPassword: string | Buffer, hashedPassword: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
