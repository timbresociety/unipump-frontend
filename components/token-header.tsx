"'use client'"
import Image from "next/image"
import { useState } from "react"

export function TokenHeader() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText("4T3k7aso4fmu7d29Fs1")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full border-b  bg-stone-950 border-stone-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="font-semibold  text-stone-50">BUSSIN</div>
          <div className=" text-stone-400">Ticker: BUSSIN</div>
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
              <span className=" px-2 py-1 rounded  bg-stone-800 text-stone-50">2CLPKU</span>
            </div>
            <span className=" text-stone-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}