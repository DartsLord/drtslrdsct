"use client"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

const ParserLastAction = () => {
    const { data, error, isLoading} = useSWR('/api/parserLastAction', fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshInterval: 5000
        })

    const date = data?.date
    const isWorking = data?.isWorking

    return (
        <>
            <p>Parser Last Action: {isWorking && (<span className={'text-green-500'}> {date}</span>)}{!!error && (
                <span className={'text-red-500'}>FAIL - {date}</span>)}{isLoading && (
                <span className={'text-yellow-100'}>loading...</span>)}</p>
        </>
    );
}

export default ParserLastAction
