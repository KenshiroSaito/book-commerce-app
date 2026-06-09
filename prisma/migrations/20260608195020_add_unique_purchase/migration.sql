/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_bookId_key" ON "Purchase"("userId", "bookId");
