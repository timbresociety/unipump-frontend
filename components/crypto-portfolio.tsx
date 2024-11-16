"'use client'"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

interface Token {
  id: string
  name: string
  balance: number
  icon: string
}

export function CryptoPortfolio() {
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "25036667",
      name: "Brah",
      balance: 8.0441,
      icon: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
    },
    {
      id: "2849909",
      name: "GLCH",
      balance: 0.1210,
      icon: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
    },
    {
      id: "woat",
      name: "WOAT",
      balance: 0.0000,
      icon: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
    },
    {
      id: "bold",
      name: "BOLD",
      balance: 0.0000,
      icon: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
    },
  ])

  const refreshBalance = async (tokenId: string) => {
    // Simulate API call with random balance update
    setTokens(currentTokens =>
      currentTokens.map(token => {
        if (token.id === tokenId) {
          return {
            ...token,
            balance: Number((Math.random() * 10).toFixed(4))
          }
        }
        return token
      })
    )
  }

  const viewCoin = (tokenId: string) => {
    console.log(`Viewing coin details for: ${tokenId}`)
    // Implement navigation or modal display logic here
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {tokens.map(token => (
          <div key={token.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={token.icon}
                alt={`${token.name} icon`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span>{token.id}</span>
                  <span>{token.name}</span>
                </div>
                <div className="text-emerald-400 font-medium">
                  {token.balance.toFixed(4)} SOL
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => viewCoin(token.id)}
                className="text-zinc-400 hover:text-white"
              >
                view coin
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}