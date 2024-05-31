import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountModule } from 'src/account/account.module';
import { BlockListModule } from 'src/block-list/block-list.module';

@Module({
  imports: [PrismaModule, AccountModule, BlockListModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
