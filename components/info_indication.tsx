"use client"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

const IndicationInfo = () => {
    const { data, error, isLoading} = useSWR('/api/projectInfo', fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: false,
            refreshInterval: 5000
        })

    const round_order = data?.round
    const outcome_order = data?.outcome
    const totalHits = ((round_order-1)*6) + outcome_order

    const indiString = round_order + ' / ' + outcome_order + ' / ' + totalHits

    return (
        <>
            <p>Dynamics R/O/H: {!!indiString && (<span className={'text-green-500'}>{indiString}</span>)}{!!error && (<span className={'text-red-500'}> FAIL</span>)}{!!isLoading && (<span className={'text-yellow-100'}>loading...</span>)}</p>
        </>
    );
}

export default IndicationInfo
