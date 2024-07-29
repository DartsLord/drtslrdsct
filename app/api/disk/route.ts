import { NextResponse } from "next/server";
import checkDiskSpace from 'check-disk-space'

export async function GET(request: Request) {
    let pathToEstimate = process.env.PATHTOESTIMATE
    let percent: string | undefined = ''

    await checkDiskSpace(pathToEstimate).then((diskSpace) => {
        if(diskSpace && diskSpace.free && diskSpace.size) {
            const free: number = diskSpace.free
            const size: number = diskSpace.size

            percent = ((free*100)/size).toFixed(2)
        }
    })
    return NextResponse.json({ percent }, { status: 200 })
}
