/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_session_id_key" ON "Payment"("session_id");
