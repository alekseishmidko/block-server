import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { BlockItemType } from '@prisma/client';

export class BlockItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  blockListId: number;

  @ApiProperty({
    enum: [BlockItemType.KeyWord, BlockItemType.Website],
  })
  type: BlockItemType;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlockListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({
    type: [BlockItemDto],
  })
  items: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: [BlockItemType.KeyWord, BlockItemType.Website],
  })
  @IsIn([BlockItemType.KeyWord, BlockItemType.Website])
  type: BlockItemType;

  @ApiProperty()
  data: string;
}
