import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class PasswordService {
  getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');
  }

  getSalt() {
    return randomBytes(16).toString('hex');
  }
}
