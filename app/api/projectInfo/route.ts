import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

let allSumsObject: object = {}
let allGapsObject: object = {}

export async function GET(request: Request) {
    let round
    let outcome
    let lasthit
    let contest
    let fpName
    let fpScore
    let spName
    let spScore

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

    let contestRecords: any[] = []
    let zeros: number[] = []
    let damaged: number[] = []
    let history: number[] = []

    if(contest){
        let contestPlayersIdsPre = await prisma.contests.findFirst({
            where: {
                extId: contest
            }
        })

        if(contestPlayersIdsPre){
            const fpId: number = contestPlayersIdsPre.fp_id
            fpScore = contestPlayersIdsPre.fp_score
            if(fpId){
                let fpNamePre = await prisma.players.findFirst({
                    where: {
                        extId: fpId
                    }
                })
                if(fpNamePre){
                    fpName = fpNamePre.first_name + ' ' + fpNamePre.last_name
                }
            }
            const spId: number = contestPlayersIdsPre.sp_id
            spScore = contestPlayersIdsPre.sp_score
            if(spId){
                let spNamePre = await prisma.players.findFirst({
                    where: {
                        extId: spId
                    }
                })
                if(spNamePre){
                    spName = spNamePre.first_name + ' ' + spNamePre.last_name
                }
            }

        }

        contestRecords = await prisma.outcomes.findMany({
            where: {
                contest_extId: contest,
            }
        })

        if(contestRecords){
            let num1Sum: number = 0
            let num2Sum: number = 0
            let num3Sum: number = 0
            let num4Sum: number = 0
            let num5Sum: number = 0
            let num6Sum: number = 0
            let num7Sum: number = 0
            let num8Sum: number = 0
            let num9Sum: number = 0
            let num10Sum: number = 0
            let num11Sum: number = 0
            let num12Sum: number = 0
            let num13Sum: number = 0
            let num14Sum: number = 0
            let num15Sum: number = 0
            let num16Sum: number = 0
            let num17Sum: number = 0
            let num18Sum: number = 0
            let num19Sum: number = 0
            let num20Sum: number = 0
            let num21Sum: number = 0

            let num1Gap: number = 0
            let num2Gap: number = 0
            let num3Gap: number = 0
            let num4Gap: number = 0
            let num5Gap: number = 0
            let num6Gap: number = 0
            let num7Gap: number = 0
            let num8Gap: number = 0
            let num9Gap: number = 0
            let num10Gap: number = 0
            let num11Gap: number = 0
            let num12Gap: number = 0
            let num13Gap: number = 0
            let num14Gap: number = 0
            let num15Gap: number = 0
            let num16Gap: number = 0
            let num17Gap: number = 0
            let num18Gap: number = 0
            let num19Gap: number = 0
            let num20Gap: number = 0
            let num21Gap: number = 0

            history = []

            contestRecords.forEach((record, index) => {
                let hit = record.h
                history.push(hit)
                if(damaged.indexOf(hit) === -1){
                    damaged.push(hit)
                }

                // собрать суммы всех
                if(hit === 1){
                    num1Sum++
                    num1Gap = 0
                } else {
                    num1Gap++
                }
                if(hit === 2){
                    num2Sum++
                    num2Gap = 0
                } else {
                    num2Gap++
                }
                if(hit === 3){
                    num3Sum++
                    num3Gap = 0
                } else {
                    num3Gap++
                }
                if(hit === 4){
                    num4Sum++
                    num4Gap = 0
                } else {
                    num4Gap++
                }
                if(hit === 5){
                    num5Sum++
                    num5Gap = 0
                } else {
                    num5Gap++
                }
                if(hit === 6){
                    num6Sum++
                    num6Gap = 0
                } else {
                    num6Gap++
                }
                if(hit === 7){
                    num7Sum++
                    num7Gap = 0
                } else {
                    num7Gap++
                }
                if(hit === 8){
                    num8Sum++
                    num8Gap = 0
                } else {
                    num8Gap++
                }
                if(hit === 9){
                    num9Sum++
                    num9Gap = 0
                } else {
                    num9Gap++
                }
                if(hit === 10){
                    num10Sum++
                    num10Gap = 0
                } else {
                    num10Gap++
                }
                if(hit === 11){
                    num11Sum++
                    num11Gap = 0
                } else {
                    num11Gap++
                }
                if(hit === 12){
                    num12Sum++
                    num12Gap = 0
                } else {
                    num12Gap++
                }
                if(hit === 13){
                    num13Sum++
                    num13Gap = 0
                } else {
                    num13Gap++
                }
                if(hit === 14){
                    num14Sum++
                    num14Gap = 0
                } else {
                    num14Gap++
                }
                if(hit === 15){
                    num15Sum++
                    num15Gap = 0
                } else {
                    num15Gap++
                }
                if(hit === 16){
                    num16Sum++
                    num16Gap = 0
                } else {
                    num16Gap++
                }
                if(hit === 17){
                    num17Sum++
                    num17Gap = 0
                } else {
                    num17Gap++
                }
                if(hit === 18){
                    num18Sum++
                    num18Gap = 0
                } else {
                    num18Gap++
                }
                if(hit === 19){
                    num19Sum++
                    num19Gap = 0
                } else {
                    num19Gap++
                }
                if(hit === 20){
                    num20Sum++
                    num20Gap = 0
                } else {
                    num20Gap++
                }
                if(hit === 21){
                    num21Sum++
                    num21Gap = 0
                } else {
                    num21Gap++
                }
            })

            for(let i:number = 1; i <= 21; i++){
                if(damaged.indexOf(i) === -1){
                    zeros.push(i)
                }
            }

            allSumsObject = {
                1:num1Sum,
                2:num2Sum,
                3:num3Sum,
                4:num4Sum,
                5:num5Sum,
                6:num6Sum,
                7:num7Sum,
                8:num8Sum,
                9:num9Sum,
                10:num10Sum,
                11:num11Sum,
                12:num12Sum,
                13:num13Sum,
                14:num14Sum,
                15:num15Sum,
                16:num16Sum,
                17:num17Sum,
                18:num18Sum,
                19:num19Sum,
                20:num20Sum,
                21:num21Sum
            }
            allGapsObject = {
                1:num1Gap,
                2:num2Gap,
                3:num3Gap,
                4:num4Gap,
                5:num5Gap,
                6:num6Gap,
                7:num7Gap,
                8:num8Gap,
                9:num9Gap,
                10:num10Gap,
                11:num11Gap,
                12:num12Gap,
                13:num13Gap,
                14:num14Gap,
                15:num15Gap,
                16:num16Gap,
                17:num17Gap,
                18:num18Gap,
                19:num19Gap,
                20:num20Gap,
                21:num21Gap
            }
        }
    }

    return NextResponse.json({contest, round, outcome, history, lasthit, damaged, zeros, allSumsObject, allGapsObject, fpName, spName, fpScore, spScore}, { status: 200 })
}
