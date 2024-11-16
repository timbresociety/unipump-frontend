'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_WETH_ADDRESS } from "@/lib/addresses";

import '@coinbase/onchainkit/styles.css';
import { Token, TokenChip } from '@coinbase/onchainkit/token';
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { createWalletClient, erc20Abi, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useAccount, usePublicClient } from "wagmi";

const token = {
    address: MOCK_WETH_ADDRESS,
    chainId: 1,
    decimals: 18,
    image:
        'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    name: 'WrappedEthereum',
    symbol: 'WETH',
};




const FaucetPage = () => {
    const [loading, setLoading] = useState(false);
    const publicClient = usePublicClient();
    const { address, chain } = useAccount();
    const account = privateKeyToAccount(process.env.NEXT_PUBLIC_FAUCET_ENV as `0x${string}`);

    return (
        <div className="max-w-7xl mx-auto pt-40">
            <div className="max-w-[300px] flex items-center justify-center relative z-50 mx-auto">
                <Image src={"/images/rocket.png"} alt="rocket" width={70} height={70} />
                <Image src={"/images/unipump.png"} alt="pump" width={160} height={160} />
            </div>
            <Card className="flex items-start max-w-[400px] mt-4 w-full space-x-4 p-5 mx-auto relative z-50 text-center justify-center">
                <div className="grid gap-4 py-4 w-full">
                    <TokenChip token={token as Token} className="w-full flex justify-center py-2" />
                    <Button disabled={loading} onClick={async () => {
                        try {
                            setLoading(true);
                            toast.loading("Sending tokens...");
                            if (!publicClient) return;
                            const client = createWalletClient({
                                account,
                                chain: chain,
                                transport: http("https://base-sepolia.g.alchemy.com/v2/2FYynUYOLgJk49PwM0_dphTkZuaw5yUe")
                            })
                            const txHash = await client.writeContract({
                                address: MOCK_WETH_ADDRESS,
                                abi: erc20Abi,
                                chain: chain,
                                functionName: "transfer",
                                args: [address as `0x${string}`, BigInt(100000000000000000)]
                            })
                            await publicClient.waitForTransactionReceipt({
                                hash: txHash
                            })
                            setLoading(false);
                            toast.dismiss();
                            toast.success("Tokens sent successfully");
                        } catch {
                            toast.dismiss();
                            toast.error("Error sending tokens");
                        }
                    }} type="submit" className="mt-4">{loading ? "Loading..." : "Submit"}</Button>
                </div>
            </Card>
        </div>
    )
}

export default FaucetPage