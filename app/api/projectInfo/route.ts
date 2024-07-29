import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET(request: Request) {
    const days: number = await prisma.days.count();
    const contests: number = await prisma.contests.count();
    const outcomes: number = await prisma.outcomes.count();

    let round
    let outcome
    let lasthit
    let contest
    let zerosString: string = ''

    const lastRecordObj = await prisma.outcomes.findMany({
        orderBy: {
            id: 'desc',
        },
        take: 1
    })

    const lastRecord = lastRecordObj[0]

    if(lastRecord){
        round = lastRecord.round_order
        outcome = lastRecord.o
        lasthit = lastRecord.h
        contest = lastRecord.contest_extId
    }

    if(contest){
        const contestObj = await prisma.outcomes.findMany({
            where: {contest_extId: contest},
            orderBy: {
                id: 'desc',
            },
            take: 60
        })

        let zeros: number[] = []
        let allNumbers: number[] = []
        let damaged: number[] = []

        for(let n= 1; n <= 21; n++){
            allNumbers.push(n)
        }

        for(let i= 0; i<contestObj.length; i++){
            if(damaged.indexOf(contestObj[i].h) < 0) damaged.push(contestObj[i].h)
        }

        for(let z= 0; z<allNumbers.length; z++){
            if(damaged.indexOf(allNumbers[z]) < 0) zeros.push(allNumbers[z])
        }

        zerosString = zeros.join(',')
    }

    return NextResponse.json({days, contests, outcomes, round, outcome, lasthit, zeros: zerosString }, { status: 200 })
}
