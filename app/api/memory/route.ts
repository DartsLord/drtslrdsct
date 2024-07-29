import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const formatMemoryUsage = (data: any) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

    let memoryData = process.memoryUsage()

    const memoryUsage: any = {
        rss: `${formatMemoryUsage(memoryData.rss)}`,
        heapTotal: `${formatMemoryUsage(memoryData.heapTotal)}`,
        heapUsed: `${formatMemoryUsage(memoryData.heapUsed)}`,
        external: `${formatMemoryUsage(memoryData.external)}`,
    }

    return NextResponse.json({ memoryUsage }, { status: 200 })
}
