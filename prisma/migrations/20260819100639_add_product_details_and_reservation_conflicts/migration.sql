/*
  Warnings:

  - A unique constraint covering the columns `[date,store_id,name,phone]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "allergens" TEXT,
ADD COLUMN     "dietary" TEXT,
ADD COLUMN     "stock" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_store_id_name_phone_key" ON "reservations"("date", "store_id", "name", "phone");
