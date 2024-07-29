"use client"
import useSWR from "swr"
require('dotenv').config()

const fetcher = (url) => fetch(url).then((res) => res.json())

const Disk = () => {
    const { data, error, isLoading} = useSWR('/api/disk', fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshInterval: 450000
        })

    const percent = data?.percent

    return (
        <>
            <p>Disk Free Space: {!!percent && (<span className={'text-green-500'}>{percent} %</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
        </>
    );
}

export default Disk
