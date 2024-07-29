-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "extId" INTEGER NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "nickname" TEXT,
    "en_nickname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parser" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rest" INTEGER NOT NULL,

    CONSTRAINT "parser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "days" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "extId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contests" (
    "id" SERIAL NOT NULL,
    "extId" INTEGER NOT NULL,
    "fp_id" INTEGER NOT NULL,
    "sp_id" INTEGER NOT NULL,
    "fp_score" INTEGER NOT NULL,
    "sp_score" INTEGER NOT NULL,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outcomes" (
    "id" SERIAL NOT NULL,
    "contest_extId" INTEGER NOT NULL,
    "round_extId" INTEGER NOT NULL,
    "round_order" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "m" TEXT NOT NULL,
    "o" INTEGER NOT NULL,

    CONSTRAINT "outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uptime" (
    "id" SERIAL NOT NULL,
    "uptime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uptime_pkey" PRIMARY KEY ("id")
);
