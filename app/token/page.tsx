"use client"
import { BuySell } from '@/components/BuySell'
import { CryptoDashboard } from '@/components/crypto-dashboard'
import { ThreadUi } from '@/components/thread-ui'
import { TokenHeader } from '@/components/token-header'
import { TradingViewChartMain } from '@/components/TradingViewChart'
import useGetAllSales from '@/hooks/useGetAllSales'
import { ChartingLibraryWidgetOptions, ResolutionString } from '@/public/static/charting_library/charting_library'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useMemo, useState } from 'react'

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: 'METH',
    interval: '60' as ResolutionString,
    library_path: '/static/charting_library/',
    locale: 'en',
    charts_storage_api_version: '1.1',
    client_id: 'methlab.xyz',
    user_id: 'public_user_id',
    fullscreen: false,
    autosize: true,
};

const TokenPage = () => {
    const [isScriptReady, setIsScriptReady] = useState(false);
    const searchParams = useSearchParams()
    const tokenAddress = searchParams.get('address')

    const { data } = useGetAllSales();
    console.log("data", data);

    const tokenData = useMemo(() => {
        if (!data) return null;
        return data.find((token: any) => token.memeTokenAddress === tokenAddress);
    }, [data, tokenAddress]);

    if (!tokenData) return <div className='min-h-screen flex items-center justify-center'>Token not found</div>;
    return (
        <div>
            <Script
                src='/static/datafeeds/udf/dist/bundle.js'
                strategy='lazyOnload'
                onReady={() => {
                    setIsScriptReady(true);
                }}
            />
            <div className='max-w-7xl relative z-50 pt-40 mx-auto'>
                <div className='flex items-start space-x-4 justify-between'>
                    <div className='w-[70%] '>
                        <TokenHeader tokenData={tokenData} />
                        {isScriptReady && <TradingViewChartMain {...defaultWidgetProps} symbol={tokenData.symbol} />}
                        <ThreadUi />
                    </div>
                    <div className='w-[30%] min-w-[400px]'>
                        <BuySell tokenData={tokenData} />
                        <CryptoDashboard tokenData={tokenData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenPage
