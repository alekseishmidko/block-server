import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService,
    private blockListService: BlockListService,
  ) {}
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async create(email: string, hash: string, salt: string) {
    const user = await this.prisma.user.create({ data: { email, hash, salt } });
    await this.accountService.createAccount(user.id);
    await this.blockListService.create(user.id);
    return user;
  }
}
