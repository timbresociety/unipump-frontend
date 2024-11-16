"'use client'"
import { Card } from "@/components/ui/card"
import { Address } from "@coinbase/onchainkit/identity"
import { ExternalLink, Heart, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useAccount } from "wagmi"

export function CryptoProfile() {
  const { address, chain } = useAccount()
  return (
    <Card className="w-full relative z-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={'https://pump.mypinata.cloud/ipfs/QmeSzchzEPqCU1jwTnsipwcBAeH7S4bmVvFGfF65iA1BY1?img-width=128&img-dpr=2&img-onerror=redirects'}
            alt="Profile"
            width={12}
            height={12}
            className="rounded-full w-12 h-12 "
          />
          <div>
            <h2 className="text-xl font-bold"><Address className="text-white" address={address} /></h2>
            <p className="text-sm text-gray-400">0 followers</p>
          </div>
        </div>
        {/* <Button className="bg-green-400 hover:bg-green-500 text-black font-semibold">
          Follow
        </Button> */}
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-500 mr-1">Likes received:</span>
          <span>0</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-500 mr-1">Mentions received:</span>
          <span>0</span>
        </div>
      </div>
      <div className="bg-gray-800 p-3 rounded-md mb-2 overflow-hidden">
        <p className="text-sm font-mono truncate">
          {address}
        </p>
      </div>
      <a
        href={chain?.blockExplorers?.default.url + "/address/" + address}
        target="_blank"
        className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-end"
      >
        View on {chain?.blockExplorers?.default.name}
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </Card>
  )
}