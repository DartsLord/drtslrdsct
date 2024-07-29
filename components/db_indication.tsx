"use client"
import useSWRImmutable from "swr/immutable"

const fetcher = (url) => fetch(url).then((res) => res.json())

const IndicationDB = () => {
    const { data, error, isLoading } = useSWRImmutable('/api/checkDB', fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshInterval: 600000
        })

    let isWorking: boolean = data?.isWorking

    return (
        <>
            <p>DB: {isWorking && (<span className={'text-green-500'}> SUCCESS</span>)}{!!error && (<span className={'text-red-500'}>FAIL</span>)}{isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
        </>
    );
}

export default IndicationDB
