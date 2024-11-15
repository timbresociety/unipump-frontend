"'use client'"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, Heart, MessageSquare } from "lucide-react"

export function CryptoProfile() {
  return (
    <Card className="w-full relative z-50 border-none  bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg?height=50&width=50"
            alt="Profile"
            className="rounded-full w-12 h-12 bg-green-500"
          />
          <div>
            <h2 className="text-xl font-bold">@Adidaphat</h2>
            <p className="text-sm text-gray-400">3 followers</p>
          </div>
        </div>
        <Button className="bg-green-400 hover:bg-green-500 text-black font-semibold">
          Follow
        </Button>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-500 mr-1">Likes received:</span>
          <span>974</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-500 mr-1">Mentions received:</span>
          <span>33</span>
        </div>
      </div>
      <div className="bg-gray-800 p-3 rounded-md mb-2 overflow-hidden">
        <p className="text-sm font-mono truncate">
          2mdKuiqs9QEbNnTAUMPncvkngGvv8ysp4u1BAZztxn3L
        </p>
      </div>
      <a
        href="#"
        className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-end"
      >
        View on solscan
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </Card>
  )
}