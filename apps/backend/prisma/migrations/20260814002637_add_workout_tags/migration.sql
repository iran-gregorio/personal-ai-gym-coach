-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
