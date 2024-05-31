import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddBlockItemDto, BlockListQueryDto } from './dto/block-list.dto';

@Injectable()
export class BlockListService {
  constructor(private prisma: PrismaService) {}
  create(userId: number) {
    return this.prisma.blockList.create({
      data: { ownerId: userId },
    });
  }
  getByUser(userId: number, query: BlockListQueryDto) {
    return this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
  async addItem(userId: number, dto: AddBlockItemDto) {
    const blockList = await this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.prisma.blockItem.create({
      data: { blockListId: blockList.id, ...dto },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const blockList = await this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.prisma.blockItem.delete({
      where: {
        blockListId: blockList.id,
        id: itemId,
      },
    });
  }
}
