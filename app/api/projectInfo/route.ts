import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

let allSumsArray: number[] = []
let allGapsArray: number[] = []
let allCNSumObject: object = {}
let allCNGapObject: object = {}
let allODSumObject: object = {}
let allODGapObject: object = {}
let allBWSumObject: object = {}
let allBWGapObject: object = {}
let allQSumObject: object = {}
let allQGapObject: object = {}

let fullRow: number[] = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 21]
let fullRowNoBull: number[] = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]

const blacks: number[] = [2,3,7,8,10,12,13,14,18,20]
const whites: number[] = [1,4,5,6,9,11,15,16,17,19]

const chets: number[] = [2,4,6,8,10,12,14,16,18,20]
const nechets: number[] = [1,3,5,7,9,11,13,15,17,19]

const ods: number[] = [1,2,3,4,5,6,7,8,9,10]
const dds: number[] = [11,12,13,14,15,16,17,18,19,20]

let q1: number[] = [20, 1, 18, 4, 13]
let q2: number[] = [6, 10, 15, 2, 17]
let q3: number[] = [3, 19, 7, 16, 8]
let q4: number[] = [11, 14, 9, 12, 5]

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

            let BSum: number = 0
            let BGap: number = 0
            let WSum: number = 0
            let WGap: number = 0
            let CSum: number = 0
            let CGap: number = 0
            let NSum: number = 0
            let NGap: number = 0
            let OSum: number = 0
            let OGap: number = 0
            let DSum: number = 0
            let DGap: number = 0
            let Q1Sum: number = 0
            let Q1Gap: number = 0
            let Q2Sum: number = 0
            let Q2Gap: number = 0
            let Q3Sum: number = 0
            let Q3Gap: number = 0
            let Q4Sum: number = 0
            let Q4Gap: number = 0

            history = []

            contestRecords.forEach((record, index) => {
                let hit = record.h
                history.push(hit)

                if(damaged.indexOf(hit) === -1){
                    damaged.push(hit)
                }

                if(blacks.indexOf(hit) > -1){
                    BSum++
                    BGap = 0
                } else {
                    BGap++
                }
                if(whites.indexOf(hit) > -1){
                    WSum++
                    WGap = 0
                } else {
                    WGap++
                }
                if(chets.indexOf(hit) > -1){
                    CSum++
                    CGap = 0
                } else {
                    CGap++
                }
                if(nechets.indexOf(hit) > -1){
                    NSum++
                    NGap = 0
                } else {
                    NGap++
                }
                if(ods.indexOf(hit) > -1){
                    OSum++
                    OGap = 0
                } else {
                    OGap++
                }
                if(dds.indexOf(hit) > -1){
                    DSum++
                    DGap = 0
                } else {
                    DGap++
                }
                if(q1.indexOf(hit) > -1){
                    Q1Sum++
                    Q1Gap = 0
                } else {
                    Q1Gap++
                }
                if(q2.indexOf(hit) > -1){
                    Q2Sum++
                    Q2Gap = 0
                } else {
                    Q2Gap++
                }
                if(q3.indexOf(hit) > -1){
                    Q3Sum++
                    Q3Gap = 0
                } else {
                    Q3Gap++
                }
                if(q4.indexOf(hit) > -1){
                    Q4Sum++
                    Q4Gap = 0
                } else {
                    Q4Gap++
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

            // раскладываем по объектам
            allSumsArray = [
                num1Sum,
                num2Sum,
                num3Sum,
                num4Sum,
                num5Sum,
                num6Sum,
                num7Sum,
                num8Sum,
                num9Sum,
                num10Sum,
                num11Sum,
                num12Sum,
                num13Sum,
                num14Sum,
                num15Sum,
                num16Sum,
                num17Sum,
                num18Sum,
                num19Sum,
                num20Sum,
                num21Sum
            ]
            allGapsArray = [
                num1Gap,
                num2Gap,
                num3Gap,
                num4Gap,
                num5Gap,
                num6Gap,
                num7Gap,
                num8Gap,
                num9Gap,
                num10Gap,
                num11Gap,
                num12Gap,
                num13Gap,
                num14Gap,
                num15Gap,
                num16Gap,
                num17Gap,
                num18Gap,
                num19Gap,
                num20Gap,
                num21Gap
            ]

            allCNSumObject = {
                'Чётные':CSum,
                'Нечётные':NSum,
            }
            allCNGapObject = {
                'Чётные':CGap,
                'Нечётные':NGap,
            }
            allBWSumObject = {
                'Белые':WSum,
                'Чёрные':BSum,
            }
            allBWGapObject = {
                'Белые':WGap,
                'Чёрные':BGap,
            }
            allODSumObject = {
                '1-10':OSum,
                '11-20':DSum,
            }
            allODGapObject = {
                '1-10':OGap,
                '11-20':DGap,
            }
            allQSumObject = {
                'Четверть 1':Q1Sum,
                'Четверть 2':Q2Sum,
                'Четверть 3':Q3Sum,
                'Четверть 4':Q4Sum,
            }
            allQGapObject = {
                'Четверть 1':Q1Gap,
                'Четверть 2':Q2Gap,
                'Четверть 3':Q3Gap,
                'Четверть 4':Q4Gap,
            }
        }
    }

    return NextResponse.json({
        contest,
        round,
        outcome,
        lasthit,
        fpName,
        spName,
        fpScore,
        spScore,
        history,
        damaged,
        zeros,
        allSumsArray,
        allGapsArray,
        allCNSumObject,
        allCNGapObject,
        allBWSumObject,
        allBWGapObject,
        allODSumObject,
        allODGapObject,
        allQSumObject,
        allQGapObject
    }, { status: 200 })
}
