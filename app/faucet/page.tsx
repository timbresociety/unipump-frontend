'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_USDC_ADDRESS } from "@/lib/addresses";

import '@coinbase/onchainkit/styles.css';
import { Token, TokenChip } from '@coinbase/onchainkit/token';
import { useState } from "react";
import { createWalletClient, erc20Abi, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useAccount, usePublicClient } from "wagmi";

const token = {
    address: '0x1234',
    chainId: 1,
    decimals: 18,
    image:
        'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    name: 'Ethereum',
    symbol: 'ETH',
};


const FaucetPage = () => {
    const [loading, setLoading] = useState(false);
    const publicClient = usePublicClient();
    const { address, chain } = useAccount();
    const onSubmit = async (data: any) => {
        console.log(data);
    }

    const account = privateKeyToAccount(process.env.NEXT_PUBLIC_FAUCET_ENV as `0x${string}`);

    return (
        <div className="max-w-7xl mx-auto pt-40">
            <Card className="flex items-start max-w-[400px] w-full space-x-4 p-5 mx-auto relative z-50 text-center justify-center">
                <div className="grid gap-4 py-4 w-full">
                    <TokenChip token={token as Token} className="w-full flex justify-center py-2" />
                    <Button disabled={loading} onClick={async () => {
                        setLoading(true);
                        if (!publicClient) return;
                        const client = createWalletClient({
                            account,
                            chain: chain,
                            transport: http()
                        })
                        const txHash = await client.writeContract({
                            address: MOCK_USDC_ADDRESS,
                            abi: erc20Abi,
                            chain: chain,
                            functionName: "transfer",
                            args: [address as `0x${string}`, BigInt(100000000000000000)]
                        })
                        await publicClient.waitForTransactionReceipt({
                            hash: txHash
                        })
                        setLoading(false);
                    }} type="submit" className="mt-4">{loading ? "Loading..." : "Submit"}</Button>
                </div>
            </Card>
        </div>
    )
}

export default FaucetPage