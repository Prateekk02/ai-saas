/*
  Warnings:

  - Added the required column `originalUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "originalUrl" TEXT NOT NULL;
