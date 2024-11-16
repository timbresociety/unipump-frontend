"'use client'"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Comment {
  id: string
  user: {
    name: string
    badge?: string
    avatar: string
  }
  timestamp: string
  likes: number
  text: string
  commentId: string
}

export function ThreadUi() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "7vsXsd123",
        badge: "yellow",
        avatar: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
      },
      timestamp: "11/14/2024",
      likes: 6,
      text: "Bussin fr",
      commentId: "#29291287"
    },
    {
      id: "2",
      user: {
        name: "7vsXsd123",
        badge: "yellow",
        avatar: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
      },
      timestamp: "11/14/2024",
      likes: 6,
      text: "Fire art",
      commentId: "#29291547"
    },
    {
      id: "3",
      user: {
        name: "SSol",
        badge: "purple",
        avatar: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
      },
      timestamp: "11/14/2024",
      likes: 6,
      text: "Send it",
      commentId: "#29292549"
    },
    {
      id: "4",
      user: {
        name: "SSol",
        badge: "purple",
        avatar: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
      },
      timestamp: "11/14/2024",
      likes: 7,
      text: "This art goes hard",
      commentId: "#29292617"
    }
  ])

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ))
  }

  return (
    <Card className="w-full border-none mt-4 text-white bg-stone-950">
      <CardHeader className="border-none">
        <Tabs defaultValue="thread" className="w-full">
          <TabsList className="grid w-52 grid-cols-2">
            <TabsTrigger
              value="thread"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
            >
              Thread
            </TabsTrigger>
            <TabsTrigger
              value="trades"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
            >
              Trades
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-b p-4">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
              alt="Avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-sm">2CLPKU (dev)</span>
            <span className="text-sm text-stone-400">11/14/2024, 1:15:07 PM</span>
          </div>
          <div className="flex gap-4">
            <Image
              src="https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect"
              alt="Post image"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold mb-2">BUSSIN (ticker: BUSSIN)</h2>
              <p className="text-stone-400">This shit bussin fr ong</p>
            </div>
          </div>
        </div>

        {/* Comments */}
        {comments.map(comment => (
          <div key={comment.id} className="border-b p-4">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={comment.user.avatar}
                alt="Avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className={`px-2 py-0.5 rounded text-sm ${comment.user.badge === "'yellow'"
                ? "'bg-yellow-500/20 text-yellow-500'"
                : "'bg-purple-500/20 text-purple-500'"
                }`}>
                {comment.user.name}
              </span>
              <span className=" text-sm text-stone-400">{comment.timestamp}</span>
            </div>
            <div className="flex items-center gap-4 ml-8">
              <p className="text-sm">{comment.text}</p>
              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleLike(comment.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <span className="text-sm  text-stone-400">{comment.likes}</span>
                <span className="text-sm  text-stone-400">{comment.commentId}</span>
                <Button variant="ghost" size="sm" className="text-sm  text-stone-400">
                  [reply]
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}