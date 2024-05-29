import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(userId: number) {
    return this.prisma.account.create({
      data: { ownerId: userId, isBlockingEnabled: false },
    });
  }
  async getAccount(userId: number) {
    this.prisma.account.findFirstOrThrow({ where: { ownerId: userId } });
  }

  async patchAccount(userId: number, dto: PatchAccountDto) {
    this.prisma.account.update({
      where: { ownerId: userId },
      data: { ...dto },
    });
  }
}
