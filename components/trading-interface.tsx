"'use client'"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function TradingInterface() {
  const [amount, setAmount] = useState("'0.0'")
  const [isBuy, setIsBuy] = useState(true)

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-[#1c1f26]">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          className={`h-14 text-xl font-medium rounded-xl ${isBuy
            ? "'bg-[#82e299] hover:bg-[#74cc89] text-black'"
            : "'bg-transparent hover:bg-slate-800 text-white border border-stone-200 border-slate-700' dark:border-stone-800"
            }`}
          onClick={() => setIsBuy(true)}
        >
          Buy
        </Button>
        <Button
          className={`h-14 text-xl font-medium rounded-xl ${!isBuy
            ? "'bg-[#82e299] hover:bg-[#74cc89] text-black'"
            : "'bg-transparent hover:bg-slate-800 text-white border border-stone-200 border-slate-700' dark:border-stone-800"
            }`}
          onClick={() => setIsBuy(false)}
        >
          Sell
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button variant="outline" className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800">
          switch to CRIME
        </Button>
        <Button variant="outline" className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800">
          Set max slippage
        </Button>
      </div>

      <div className="relative mb-6">
        <Input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-14 bg-[#1c1f26] border-slate-700 rounded-xl pl-4 pr-20 text-2xl text-slate-300"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
          <span className="text-xl text-slate-300">SOL</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          onClick={() => setAmount("'0.0'")}
          className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
        >
          reset
        </Button>
        <Button
          variant="outline"
          onClick={() => setAmount("'0.1'")}
          className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
        >
          0.1 SOL
        </Button>
        <Button
          variant="outline"
          onClick={() => setAmount("'0.5'")}
          className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
        >
          0.5 SOL
        </Button>
        <Button
          variant="outline"
          onClick={() => setAmount("'1'")}
          className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
        >
          1 SOL
        </Button>
      </div>

      <Button className="w-full h-14 text-xl font-medium mb-4 bg-[#82e299] hover:bg-[#74cc89] text-black rounded-xl">
        place trade
      </Button>

      <label className="flex items-center gap-2 text-slate-400">
        <Checkbox className="border-slate-700 data-[state=checked]:bg-[#82e299] data-[state=checked]:border-[#82e299]" />
        <span>add comment</span>
      </label>
    </div>
  )
}