-- CreateEnum
CREATE TYPE "BlockItemType" AS ENUM ('Website', 'KeyWord');

-- CreateTable
CREATE TABLE "BlockList" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "BlockList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockItem" (
    "id" SERIAL NOT NULL,
    "blockListId" INTEGER NOT NULL,
    "type" "BlockItemType" NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockList_ownerId_key" ON "BlockList"("ownerId");

-- AddForeignKey
ALTER TABLE "BlockList" ADD CONSTRAINT "BlockList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockItem" ADD CONSTRAINT "BlockItem_blockListId_fkey" FOREIGN KEY ("blockListId") REFERENCES "BlockList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
