"use client"
import { BuySell } from '@/components/BuySell'
import { ThreadUi } from '@/components/thread-ui'
import { TokenHeader } from '@/components/token-header'
import { TradingViewChartMain } from '@/components/TradingViewChart'
import { ChartingLibraryWidgetOptions, ResolutionString } from '@/public/static/charting_library/charting_library'
import Script from 'next/script'
import { useState } from 'react'

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
                        <TokenHeader />
                        {isScriptReady && <TradingViewChartMain {...defaultWidgetProps} />}
                        <ThreadUi />
                    </div>
                    <div className='w-[30%] min-w-[400px]'>
                        <BuySell />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenPage
