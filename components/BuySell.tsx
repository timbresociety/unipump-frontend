"'use client'"
import { UniPumpAbi } from "@/abi/UniPumpAbi.s";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MOCK_WETH_ADDRESS, UNIPUMP_ADDRESS } from "@/lib/addresses";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Slippage } from "./Slippage";
import TransactionComponent from "./Transaction";

export function BuySell({ tokenData }: { tokenData: any }) {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const [amount, setAmount] = useState("0.0")
  const [useWeth, setUseWeth] = useState(true)
  const [approveWeth, setApproveWeth] = useState(false)
  const { data } = useReadContract({
    address: MOCK_WETH_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as Address]
  })
  const { data: tokenBalance } = useReadContract({
    address: tokenData.memeTokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as Address]
  })


  function isTransactionDisabled() {
    if (!amount || parseFloat(amount) <= 0) return true
    if (data !== undefined) {
      return data === BigInt(0)
    }
    return false
  }
  function isSellTransactionDisabled() {
    if (!amount || parseFloat(amount) <= 0) return true
    if (tokenBalance !== undefined) {
      return tokenBalance === BigInt(0)
    }
    return false
  }

  const isDisabled = isTransactionDisabled()
  console.log("isDisabled", isDisabled);
  const isSellDisabled = isSellTransactionDisabled()

  return (
    <Tabs defaultValue="Buy" className="w-[400px]">
      <TabsList className="grid h-[50px] w-full rounded-xl grid-cols-2">
        <TabsTrigger value="Buy" className="h-full rounded-xl">Buy</TabsTrigger>
        <TabsTrigger value="Sell" onClick={() => setUseWeth(true)} className="h-full rounded-xl">Sell</TabsTrigger>
      </TabsList>
      <TabsContent value="Buy">
        <Card>
          <CardContent className="space-y-4 mt-4">
            <div className="relative mb-2">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setUseWeth(!useWeth)}
                  className="bg-[#1c1f26]  text-slate-300 border-slate-700 hover:bg-slate-800"
                >
                  Switch To {!useWeth ? "USDC" : tokenData.symbol}
                </Button>
                <Slippage />
              </div>
              <div className="flex items-center mt-2 justify-end">
                <Button
                  variant="outline"
                  className="bg-[#1c1f26]  text-slate-300 border-slate-700 hover:bg-slate-800"
                >
                  Max Balance {useWeth && data ? formatUnits(data, 18) : "0"}
                </Button>
              </div>
              <div className="relative mt-2">
                <Input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} id="name" defaultValue="Pedro Duarte" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Image src={useWeth ? "/images/weth.png" : tokenData.imageUri} alt={useWeth ? "WETH" : tokenData.symbol} width={20} height={20} />
                  <span className="text-md text-slate-300">{useWeth ? "WETH" : tokenData.symbol}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => setAmount("0.1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.1 {useWeth ? "WETH" : tokenData.symbol}
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.0001")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.0001 {useWeth ? "WETH" : tokenData.symbol}
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.00002")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.00002 {useWeth ? "WETH" : tokenData.symbol}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            {approveWeth ? (
              <TransactionComponent
                handleOnStatus2={(status) => {
                  if (status.statusName === "success") {
                    setApproveWeth(true)
                    queryClient.invalidateQueries({ queryKey: ["getAllSales"] })
                  }
                }}
                cta="Buy"
                contractAddress={UNIPUMP_ADDRESS}
                contractAbi={UniPumpAbi}
                functionName="buyTokenFromSale"
                args={[tokenData.memeTokenAddress, parseUnits(amount, 18).toString()]}
              />
            ) : (
              <TransactionComponent
                handleOnStatus2={(status) => {
                  if (status.statusName === "success") {
                    setApproveWeth(true)
                  }
                }}
                disabled={isDisabled}
                cta="Approve"
                contractAddress={MOCK_WETH_ADDRESS}
                contractAbi={erc20Abi}
                functionName="approve"
                args={[UNIPUMP_ADDRESS, parseUnits(amount, 18).toString()]}
              />
            )}
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
              <div className="flex items-center mt-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setAmount(tokenBalance ? formatUnits(tokenBalance, 18) : "0")}
                  className="bg-[#1c1f26]  text-slate-300 border-slate-700 hover:bg-slate-800"
                >
                  Max Balance {useWeth && tokenBalance ? formatUnits(tokenBalance, 18) : "0"}
                </Button>
              </div>
              <div className="relative mt-2">
                <Input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} id="name" defaultValue="Pedro Duarte" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Image src={tokenData.imageUri} alt={tokenData.symbol} width={20} height={20} />
                  <span className="text-md text-slate-300">{tokenData.symbol}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              <Button
                variant="outline"
                onClick={() => setAmount("0.1")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.1 {tokenData.symbol}
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.0001")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.0001 {tokenData.symbol}
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount("0.00002")}
                className="bg-[#1c1f26] text-slate-300 border-slate-700 hover:bg-slate-800"
              >
                0.00002 {tokenData.symbol}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            {approveWeth ? (
              <TransactionComponent
                handleOnStatus2={(status) => {
                  if (status.statusName === "success") {
                    setApproveWeth(true)
                    queryClient.invalidateQueries({ queryKey: ["getAllSales"] })

                  }
                }}
                cta="Sell"
                contractAddress={UNIPUMP_ADDRESS}
                contractAbi={UniPumpAbi}
                functionName="sellTokenFromSale"
                args={[tokenData.memeTokenAddress, parseUnits(amount, 18).toString()]}
              />
            ) : (
              <TransactionComponent
                handleOnStatus2={(status) => {
                  if (status.statusName === "success") {
                    setApproveWeth(true)
                  }
                }}
                disabled={isSellDisabled}
                cta="Approve"
                contractAddress={MOCK_WETH_ADDRESS}
                contractAbi={erc20Abi}
                functionName="approve"
                args={[UNIPUMP_ADDRESS, parseUnits(amount, 18).toString()]}
              />
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
