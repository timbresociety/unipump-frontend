"'use client'"
import { Address } from "@coinbase/onchainkit/identity"
import Image from "next/image"
import { Card } from "./ui/card"

export function TokenHeader({ tokenData }: {
  tokenData: any
}) {
  // const { data } = useReadContract({
  //   abi: UniPumpAbi,
  //   address: UNIPUMP_ADDRESS,
  //   functionName: "cap",
  //   args: [tokenData.memeTokenAddress as `0x${string}`, UNIPUMP_ADDRESS as `0x${string}`],
  // })

  return (
    <Card className="w-full mb-4">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="font-semibold  text-stone-50">{tokenData.name}</div>
          <div className=" text-stone-400">Ticker: {tokenData.symbol}</div>
          <div className="text-green-500">Market cap: $6,613.53</div>
          <div className="ml-auto flex items-center gap-2">
            <span className=" text-stone-400">by</span>
            <div className="flex items-center gap-2">
              <Image
                src="https://pump.mypinata.cloud/ipfs/QmaW2yTUvxPaqRHgEBBmrwpydAC3zvMNSdrGL8ZVxx8KEq?img-width=128&img-dpr=2&img-onerror=redirect"
                alt="Avatar"
                className="rounded-full"
                width={24}
                height={24}
              />
              <span className=" px-2 py-1 rounded  bg-stone-800 !text-white">
                <Address address={tokenData.createdBy} className="text-white" />
              </span>
            </div>
            <span className=" text-stone-400">1 day ago</span>
          </div>
        </div>
      </div>
    </Card>
  )
}