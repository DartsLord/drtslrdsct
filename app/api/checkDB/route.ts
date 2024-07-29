import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET(request: Request) {
    const objectFromDb = await prisma.parser.findFirst({where: {id: 1}});
    let isWorking = false
    if(objectFromDb){
        isWorking = true;
    }
    return NextResponse.json({isWorking}, { status: 200 })
}
