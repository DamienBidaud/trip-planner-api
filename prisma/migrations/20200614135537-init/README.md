# Migration `20200614135537-init`

This migration has been generated at 6/14/2020, 1:55:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

CREATE TYPE "LocationType" AS ENUM ('ORIGIN', 'DESTINATION', 'UNIQUE');

CREATE TABLE "public"."Activity" (
"description" text   ,"endDate" timestamp(3)   ,"id" SERIAL,"price" Decimal(65,30)   ,"startDate" timestamp(3)   ,"title" text  NOT NULL ,"tripId" integer   ,"type" text   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Location" (
"activityId" integer   ,"city" text  NOT NULL ,"country" text  NOT NULL ,"googleUrl" text   ,"id" SERIAL,"latitude" text   ,"longitude" text   ,"type" "LocationType" NOT NULL DEFAULT E'UNIQUE',
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Trip" (
"authorId" integer   ,"id" SERIAL,"participants" text []  ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Author" (
"email" text  NOT NULL ,"id" SERIAL,"password" text  NOT NULL ,"role" "Role" NOT NULL DEFAULT E'USER',"username" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Author.email" ON "public"."Author"("email")

ALTER TABLE "public"."Activity" ADD FOREIGN KEY ("tripId")REFERENCES "public"."Trip"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Location" ADD FOREIGN KEY ("activityId")REFERENCES "public"."Activity"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Trip" ADD FOREIGN KEY ("authorId")REFERENCES "public"."Author"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200614135537-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,60 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Activity {
+  id Int @id @default(autoincrement())
+  title String
+  locations Location[]
+  price Float?
+  startDate DateTime?
+  endDate DateTime?
+  type String?
+  description String?
+}
+
+model Location {
+  id Int @id @default(autoincrement())
+  country String
+  city String
+  longitude String?
+  latitude String?
+  type LocationType @default(UNIQUE)
+  googleUrl String?
+}
+
+model Trip {
+  id Int @id @default(autoincrement())
+  title String
+  activities Activity[]
+  participants String[]
+}
+
+model Author {
+  id Int @id @default(autoincrement())
+  email String @unique
+  username String
+  password String
+  trips Trip[]
+  role Role @default(USER)
+}
+
+
+enum Role {
+  ADMIN
+  USER
+}
+
+enum LocationType {
+  ORIGIN
+  DESTINATION
+  UNIQUE
+}
```
