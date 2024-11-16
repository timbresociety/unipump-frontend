"use client"
import TokenPageComp from '@/components/TokenPage'
import React, { Suspense } from 'react'

const TokenPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TokenPageComp />
        </Suspense>
    )
}

export default TokenPage