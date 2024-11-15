"'use client'"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import { useState } from "react"
import { Slippage } from "./Slippage"

export function BuySell() {
  const [amount, setAmount] = useState("0.0")
  return (
    <Tabs defaultValue="Buy" className="w-[400px]">
      <TabsList className="grid h-[50px] w-full rounded-xl grid-cols-2">
        <TabsTrigger value="Buy" className="h-full rounded-xl">Buy</TabsTrigger>
        <TabsTrigger value="Sell" className="h-full rounded-xl">Sell</TabsTrigger>
      </TabsList>
      <TabsContent value="Buy">
        <Card>
          <CardContent className="space-y-4 mt-4">
            <div className="relative mb-2">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setAmount("0.1")}
                  className="bg-[#1c1f26]  text-slate-300 border-slate-700 hover:bg-slate-800"
                >
                  Switch To $Hook
                </Button>
                <Slippage />
              </div>
              <div className="relative mt-2">
                <Input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} id="name" defaultValue="Pedro Duarte" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Image src="/images/usdc.png" alt="USDC" width={20} height={20} />
                  <span className="text-md text-slate-300">USDC</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => setAmount("0.1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                10 USDC
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.5")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                50 USDC
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                100 USDC
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-lg">Place Trade</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Sell">
        <Card>
          <CardContent className="space-y-4 mt-4">
            <div className="relative">
              <div className="flex mb-2 items-center justify-end">
                <Slippage />
              </div>
              <div className="relative mt-2">
                <Input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} id="name" defaultValue="Pedro Duarte" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Image src="/images/usdc.png" alt="USDC" width={20} height={20} />
                  <span className="text-md text-slate-300">USDC</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => setAmount("0.1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                10 USDC
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.5")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                50 USDC
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                100 USDC
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-lg">Place Trade</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
