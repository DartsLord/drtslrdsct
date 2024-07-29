"use client"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

const Memory = () => {
    const { data, error, isLoading} = useSWR('/api/memory', fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshInterval: 15000
        })

    // rss: Resident Set Size - total memory allocated for the process execution`,
    // heapTotal: total size of the allocated heap`,
    // heapUsed: actual memory used during the execution`,
    // external: V8 external memory`,

    const rss = data?.memoryUsage.rss
    const heapTotal = data?.memoryUsage.heapTotal
    const heapUsed = data?.memoryUsage.heapUsed
    const external = data?.memoryUsage.external

    return (
        <>
            <p>Resident Set Size: {!!rss && (<span className={'text-green-500'}>{rss}</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
            <p>Heap Total: {!!heapTotal && (<span className={'text-green-500'}>{heapTotal}</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
            <p>Heap Used: {!!heapUsed && (<span className={'text-green-500'}>{heapUsed}</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
            <p>External V8: {!!external && (<span className={'text-green-500'}>{external}</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
        </>
    );
}

export default Memory
