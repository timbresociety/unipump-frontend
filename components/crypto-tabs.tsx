"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CoinsCreated from "./CoinsCreated"
import { Card } from "./ui/card"

export function CryptoTabs() {
  return (
    <Card className="w-full relative z-50 p-4 rounded-lg">
      <div className="flex items-center justify-between w-full   mb-2">
        <Tabs defaultValue="held" className="w-auto">
          <TabsList className="bg-transparent border-0 w-full p-0 gap-2">
            <TabsTrigger
              value="held"
              className="data-[state=active]:bg-green-400 data-[state=active]:text-black px-4 py-2 rounded-md text-gray-400 hover:text-white transition-colors"
            >
              coins held
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="data-[state=active]:bg-green-400 data-[state=active]:text-black px-4 py-2 rounded-md text-gray-400 hover:text-white transition-colors"
            >
              coins created
            </TabsTrigger>
            <TabsTrigger
              value="followers"
              className="data-[state=active]:bg-green-400 data-[state=active]:text-black px-4 py-2 rounded-md text-gray-400 hover:text-white transition-colors"
            >
              followers
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="data-[state=active]:bg-green-400  data-[state=active]:text-black px-4 py-2 rounded-md text-gray-400 hover:text-white transition-colors"
            >
              following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="held">
            <CoinsCreated />
          </TabsContent>
          <TabsContent value="created">
            <div className="h-[200px] w-full flex items-center justify-center bg-gray-800 rounded-md">
              <h1 className="text-white">No Data found</h1>
            </div>
          </TabsContent>
          <TabsContent value="followers">
            <div className="h-[200px] w-full flex items-center justify-center bg-gray-800 rounded-md">
              <h1 className="text-white">No Data found</h1>
            </div>
          </TabsContent>
          <TabsContent value="following">
            <div className="h-[200px] w-full flex items-center justify-center bg-gray-800 rounded-md">
              <h1 className="text-white">No Data found</h1>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}