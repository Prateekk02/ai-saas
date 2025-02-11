/*
  Warnings:

  - Added the required column `aspectRation` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableSafetyChecker` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numFrames` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numInferenceSteps` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proMode` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seed` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strength` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "aspectRation" TEXT NOT NULL,
ADD COLUMN     "enableSafetyChecker" BOOLEAN NOT NULL,
ADD COLUMN     "numFrames" INTEGER NOT NULL,
ADD COLUMN     "numInferenceSteps" INTEGER NOT NULL,
ADD COLUMN     "proMode" BOOLEAN NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "resolution" INTEGER NOT NULL,
ADD COLUMN     "seed" INTEGER NOT NULL,
ADD COLUMN     "strength" DOUBLE PRECISION NOT NULL;
