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

let leftOutcomesNumbers: number[] = [1,2,3]
let rightOutcomesNumbers: number[] = [4,5,6]

export async function GET(request: Request) {
    let P1Num1Sum: number = 0
    let P1Num2Sum: number = 0
    let P1Num3Sum: number = 0
    let P1Num4Sum: number = 0
    let P1Num5Sum: number = 0
    let P1Num6Sum: number = 0
    let P1Num7Sum: number = 0
    let P1Num8Sum: number = 0
    let P1Num9Sum: number = 0
    let P1Num10Sum: number = 0
    let P1Num11Sum: number = 0
    let P1Num12Sum: number = 0
    let P1Num13Sum: number = 0
    let P1Num14Sum: number = 0
    let P1Num15Sum: number = 0
    let P1Num16Sum: number = 0
    let P1Num17Sum: number = 0
    let P1Num18Sum: number = 0
    let P1Num19Sum: number = 0
    let P1Num20Sum: number = 0
    let P1Num21Sum: number = 0

    let P2Num1Sum: number = 0
    let P2Num2Sum: number = 0
    let P2Num3Sum: number = 0
    let P2Num4Sum: number = 0
    let P2Num5Sum: number = 0
    let P2Num6Sum: number = 0
    let P2Num7Sum: number = 0
    let P2Num8Sum: number = 0
    let P2Num9Sum: number = 0
    let P2Num10Sum: number = 0
    let P2Num11Sum: number = 0
    let P2Num12Sum: number = 0
    let P2Num13Sum: number = 0
    let P2Num14Sum: number = 0
    let P2Num15Sum: number = 0
    let P2Num16Sum: number = 0
    let P2Num17Sum: number = 0
    let P2Num18Sum: number = 0
    let P2Num19Sum: number = 0
    let P2Num20Sum: number = 0
    let P2Num21Sum: number = 0

    let P1Q1Sum: number = 0
    let P1Q2Sum: number = 0
    let P1Q3Sum: number = 0
    let P1Q4Sum: number = 0

    let P2Q1Sum: number = 0
    let P2Q2Sum: number = 0
    let P2Q3Sum: number = 0
    let P2Q4Sum: number = 0

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
    let player1Id = null
    let player2Id = null

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
                player1Id = fpId
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
                player2Id = spId
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
            },
            orderBy: [
                {
                    id: 'asc',
                }
            ],
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
                num20Sum,
                num1Sum,
                num18Sum,
                num4Sum,
                num13Sum,
                num6Sum,
                num10Sum,
                num15Sum,
                num2Sum,
                num17Sum,
                num3Sum,
                num19Sum,
                num7Sum,
                num16Sum,
                num8Sum,
                num11Sum,
                num14Sum,
                num9Sum,
                num12Sum,
                num5Sum,
                num21Sum
            ]
            allGapsArray = [
                num20Gap,
                num1Gap,
                num18Gap,
                num4Gap,
                num13Gap,
                num6Gap,
                num10Gap,
                num15Gap,
                num2Gap,
                num17Gap,
                num3Gap,
                num19Gap,
                num7Gap,
                num16Gap,
                num8Gap,
                num11Gap,
                num14Gap,
                num9Gap,
                num12Gap,
                num5Gap,
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
                'Ч1':Q1Sum,
                'Ч2':Q2Sum,
                'Ч3':Q3Sum,
                'Ч4':Q4Sum,
            }
            allQGapObject = {
                'Ч1':Q1Gap,
                'Ч2':Q2Gap,
                'Ч3':Q3Gap,
                'Ч4':Q4Gap,
            }
        }
    }

    let Top5Player1: number[] = []
    let Top5Player2: number[] = []

    if(player1Id && player2Id && outcome === 1){
        // for Player 1
        let Player1ContestsIdsLeftArray: number[] = []
        const allPlayer1ContestsLeftPromise = prisma.contests.findMany({
            where: {
                fp_id: parseInt(player1Id),
            }
        })

        const allPlayer1ContestsLeft = await allPlayer1ContestsLeftPromise
        if(allPlayer1ContestsLeft){
            allPlayer1ContestsLeft.forEach((contest) => {
                Player1ContestsIdsLeftArray.push(contest.extId)
            })
        }

        let Player1ContestsIdsRightArray: number[] = []
        const allPlayer1ContestsRightPromise = prisma.contests.findMany({
            where: {
                sp_id: parseInt(player1Id),
            }
        })

        const allPlayer1ContestsRight = await allPlayer1ContestsRightPromise
        if(allPlayer1ContestsRight){
            allPlayer1ContestsRight.forEach((contest) => {
                Player1ContestsIdsRightArray.push(contest.extId)
            })
        }

        const allPlayer1OutcomesLeftPromise = prisma.outcomes.findMany({
            where: {
                contest_extId: {
                    in: Player1ContestsIdsLeftArray
                },
                o: {
                    in: leftOutcomesNumbers
                }
            }
        })
        const allPlayer1OutcomesLeft = await allPlayer1OutcomesLeftPromise

        const allPlayer1OutcomesRightPromise = prisma.outcomes.findMany({
            where: {
                contest_extId: {
                    in: Player1ContestsIdsRightArray
                },
                o: {
                    in: rightOutcomesNumbers
                }
            }
        })
        const allPlayer1OutcomesRight = await allPlayer1OutcomesRightPromise

        // for Player 2
        let Player2ContestsIdsLeftArray: number[] = []
        const allPlayer2ContestsLeftPromise = prisma.contests.findMany({
            where: {
                fp_id: parseInt(player2Id),
            }
        })

        const allPlayer2ContestsLeft = await allPlayer2ContestsLeftPromise
        if(allPlayer2ContestsLeft){
            allPlayer2ContestsLeft.forEach((contest) => {
                Player2ContestsIdsLeftArray.push(contest.extId)
            })
        }

        let Player2ContestsIdsRightArray: number[] = []
        const allPlayer2ContestsRightPromise = prisma.contests.findMany({
            where: {
                sp_id: parseInt(player2Id),
            }
        })

        const allPlayer2ContestsRight = await allPlayer2ContestsRightPromise
        if(allPlayer2ContestsRight){
            allPlayer2ContestsRight.forEach((contest) => {
                Player2ContestsIdsRightArray.push(contest.extId)
            })
        }

        const allPlayer2OutcomesLeftPromise = prisma.outcomes.findMany({
            where: {
                contest_extId: {
                    in: Player2ContestsIdsLeftArray
                },
                o: {
                    in: leftOutcomesNumbers
                }
            }
        })
        const allPlayer2OutcomesLeft = await allPlayer2OutcomesLeftPromise

        const allPlayer2OutcomesRightPromise = prisma.outcomes.findMany({
            where: {
                contest_extId: {
                    in: Player2ContestsIdsRightArray
                },
                o: {
                    in: rightOutcomesNumbers
                }
            }
        })
        const allPlayer2OutcomesRight = await allPlayer2OutcomesRightPromise

        // calculating
        if(allPlayer1OutcomesLeft){
            allPlayer1OutcomesLeft.forEach((outcome) => {
                const hit: number = outcome.h

                if(hit === 1) P1Num1Sum++
                if(hit === 2) P1Num2Sum++
                if(hit === 3) P1Num3Sum++
                if(hit === 4) P1Num4Sum++
                if(hit === 5) P1Num5Sum++
                if(hit === 6) P1Num6Sum++
                if(hit === 7) P1Num7Sum++
                if(hit === 8) P1Num8Sum++
                if(hit === 9) P1Num9Sum++
                if(hit === 10) P1Num10Sum++
                if(hit === 11) P1Num11Sum++
                if(hit === 12) P1Num12Sum++
                if(hit === 13) P1Num13Sum++
                if(hit === 14) P1Num14Sum++
                if(hit === 15) P1Num15Sum++
                if(hit === 16) P1Num16Sum++
                if(hit === 17) P1Num17Sum++
                if(hit === 18) P1Num18Sum++
                if(hit === 19) P1Num19Sum++
                if(hit === 20) P1Num20Sum++
                if(hit === 21) P1Num21Sum++
            })
        }
        if(allPlayer1OutcomesRight){
            allPlayer1OutcomesRight.forEach((outcome) => {
                const hit: number = outcome.h

                if(hit === 1) P1Num1Sum++
                if(hit === 2) P1Num2Sum++
                if(hit === 3) P1Num3Sum++
                if(hit === 4) P1Num4Sum++
                if(hit === 5) P1Num5Sum++
                if(hit === 6) P1Num6Sum++
                if(hit === 7) P1Num7Sum++
                if(hit === 8) P1Num8Sum++
                if(hit === 9) P1Num9Sum++
                if(hit === 10) P1Num10Sum++
                if(hit === 11) P1Num11Sum++
                if(hit === 12) P1Num12Sum++
                if(hit === 13) P1Num13Sum++
                if(hit === 14) P1Num14Sum++
                if(hit === 15) P1Num15Sum++
                if(hit === 16) P1Num16Sum++
                if(hit === 17) P1Num17Sum++
                if(hit === 18) P1Num18Sum++
                if(hit === 19) P1Num19Sum++
                if(hit === 20) P1Num20Sum++
                if(hit === 21) P1Num21Sum++
            })
        }
        if(allPlayer2OutcomesLeft){
            allPlayer2OutcomesLeft.forEach((outcome) => {
                const hit: number = outcome.h

                if(hit === 1) P2Num1Sum++
                if(hit === 2) P2Num2Sum++
                if(hit === 3) P2Num3Sum++
                if(hit === 4) P2Num4Sum++
                if(hit === 5) P2Num5Sum++
                if(hit === 6) P2Num6Sum++
                if(hit === 7) P2Num7Sum++
                if(hit === 8) P2Num8Sum++
                if(hit === 9) P2Num9Sum++
                if(hit === 10) P2Num10Sum++
                if(hit === 11) P2Num11Sum++
                if(hit === 12) P2Num12Sum++
                if(hit === 13) P2Num13Sum++
                if(hit === 14) P2Num14Sum++
                if(hit === 15) P2Num15Sum++
                if(hit === 16) P2Num16Sum++
                if(hit === 17) P2Num17Sum++
                if(hit === 18) P2Num18Sum++
                if(hit === 19) P2Num19Sum++
                if(hit === 20) P2Num20Sum++
                if(hit === 21) P2Num21Sum++
            })
        }
        if(allPlayer2OutcomesRight){
            allPlayer2OutcomesRight.forEach((outcome) => {
                const hit: number = outcome.h

                if(hit === 1) P2Num1Sum++
                if(hit === 2) P2Num2Sum++
                if(hit === 3) P2Num3Sum++
                if(hit === 4) P2Num4Sum++
                if(hit === 5) P2Num5Sum++
                if(hit === 6) P2Num6Sum++
                if(hit === 7) P2Num7Sum++
                if(hit === 8) P2Num8Sum++
                if(hit === 9) P2Num9Sum++
                if(hit === 10) P2Num10Sum++
                if(hit === 11) P2Num11Sum++
                if(hit === 12) P2Num12Sum++
                if(hit === 13) P2Num13Sum++
                if(hit === 14) P2Num14Sum++
                if(hit === 15) P2Num15Sum++
                if(hit === 16) P2Num16Sum++
                if(hit === 17) P2Num17Sum++
                if(hit === 18) P2Num18Sum++
                if(hit === 19) P2Num19Sum++
                if(hit === 20) P2Num20Sum++
                if(hit === 21) P2Num21Sum++
            })
        }

        let Top5Player1Pre: object = {
            20: P1Num20Sum,
            1: P1Num1Sum,
            18: P1Num18Sum,
            4: P1Num4Sum,
            13: P1Num13Sum,
            6: P1Num6Sum,
            10: P1Num10Sum,
            15: P1Num15Sum,
            2: P1Num2Sum,
            17: P1Num17Sum,
            3: P1Num3Sum,
            19: P1Num19Sum,
            7: P1Num7Sum,
            16: P1Num16Sum,
            8: P1Num8Sum,
            11: P1Num11Sum,
            14: P1Num14Sum,
            9: P1Num9Sum,
            12: P1Num12Sum,
            5: P1Num5Sum,
            21: P1Num21Sum,
        };

        let Top5Player2Pre: object = {
            20: P2Num20Sum,
            1: P2Num1Sum,
            18: P2Num18Sum,
            4: P2Num4Sum,
            13: P2Num13Sum,
            6: P2Num6Sum,
            10: P2Num10Sum,
            15: P2Num15Sum,
            2: P2Num2Sum,
            17: P2Num17Sum,
            3: P2Num3Sum,
            19: P2Num19Sum,
            7: P2Num7Sum,
            16: P2Num16Sum,
            8: P2Num8Sum,
            11: P2Num11Sum,
            14: P2Num14Sum,
            9: P2Num9Sum,
            12: P2Num12Sum,
            5: P2Num5Sum,
            21: P2Num21Sum,
        };

        let sortedTop5Player1Pre = [];
        for (let num in Top5Player1Pre) {
            sortedTop5Player1Pre.push([num, Top5Player1Pre[num]]);
        }

        let sortedTop5Player2Pre = [];
        for (let num in Top5Player2Pre) {
            sortedTop5Player2Pre.push([num, Top5Player2Pre[num]]);
        }

        sortedTop5Player1Pre.sort(function(a, b) {
            return b[1] - a[1];
        });

        sortedTop5Player2Pre.sort(function(a, b) {
            return b[1] - a[1];
        });

        for(let i: number = 0; i < 5; i++) {
            Top5Player1.push(sortedTop5Player1Pre[i][0])
        }

        for(let i: number = 0; i < 5; i++) {
            Top5Player2.push(sortedTop5Player2Pre[i][0])
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
        allQGapObject,
        Top5Player1,
        Top5Player2
    }, { status: 200 })
}
