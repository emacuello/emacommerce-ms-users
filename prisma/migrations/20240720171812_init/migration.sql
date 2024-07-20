-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT,
    "country" TEXT,
    "address" TEXT,
    "city" TEXT,
    "orders" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "birthdate" TEXT
);
