"'use client'"

import { UniPumpAbi } from "@/abi/UniPumpAbi.s"
import { Progress } from "@/components/ui/progress"
import { UNIPUMP_ADDRESS } from "@/lib/addresses"
import Big from "big.js"
import Image from "next/image"
import Link from "next/link"
import { useReadContract } from "wagmi"
import { Card } from "./ui/card"

export function CryptoDashboard({ tokenData }: { tokenData: any }) {

  const { data: poolState } = useReadContract({
    abi: UniPumpAbi,
    address: UNIPUMP_ADDRESS,
    functionName: "getPoolState",
    args: [tokenData.memeTokenAddress as `0x${string}`],
    query: {
      select(data) {
        const scaledDownSupply = Big(data.supply.toString()).div(1e18)
        return {
          bondingCurvePercent: Big(scaledDownSupply).div(Math.pow(800, 6)).mul(100).toFixed(5, 0),
          kingOfTheHillPercent: Big(scaledDownSupply).div(Math.pow(450, 6)).mul(100).toFixed(5, 0)
        }
      },
    }
  })


  return (
    <Card className="mt-4 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Social Links */}
        <div className="space-x-4">
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            [twitter]
          </Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            [discord]
          </Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">
            [website]
          </Link>
        </div>

        <div className="flex items-start gap-6">
          <Image
            src={tokenData.imageUri}
            alt="NVIDIA AI CAT"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-zinc-300">
            {tokenData.name} ({tokenData.symbol})
          </h1>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>bonding curve progress: {poolState?.bondingCurvePercent ?? "--"}%</span>
            <span>{poolState?.bondingCurvePercent ?? "--"}%</span>
          </div>
          <Progress value={parseInt(poolState?.bondingCurvePercent ?? "0")} className="bg-zinc-800">
            <div className="bg-emerald-500 h-full w-[4%] rounded-full" />
          </Progress>
          <p className="text-sm">
            when the market cap reaches 6.9 eth all the liquidity from the bonding
            curve will be deposited into Raydium and burned. progression increases
            as the price goes up.
          </p>
          <p className="text-sm">
            there are 765,433,613 tokens still available for sale in the bonding
            curve and there is 0.794 in the bonding curve.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>king of the hill progress: {poolState?.kingOfTheHillPercent ?? "--"}%</span>
            <span>{poolState?.kingOfTheHillPercent ?? "--"}%</span>
          </div>
          <Progress value={parseInt(poolState?.kingOfTheHillPercent ?? "0")} className="bg-zinc-800">
            <div className="bg-yellow-500 h-full w-[4%] rounded-full" />
          </Progress>
          <p className="text-sm">dethrone the current king at a $43,902 mcap</p>
        </div>
      </div>
    </Card>
  )
}