import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService,
  ) {}
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async create(email: string, hash: string, salt: string) {
    const user = await this.prisma.user.create({ data: { email, hash, salt } });
    await this.accountService.createAccount(user.id);
    return user;
  }
}
