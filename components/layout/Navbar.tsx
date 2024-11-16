"use client";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { AnimatePresence, motion } from "framer-motion";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccountEffect } from "wagmi";
import ProfileModal from "../profile/ProfileModal";

const emojis = ["👽", "🦄", "🚀"]

const Navbar = () => {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)
  const [open, setOpen] = useState(false)
  useAccountEffect({
    onConnect: () => {
      console.log("connected")
      setOpen(true)
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex absolute top-0 right-0 w-full justify-between items-center p-4">
      <ProfileModal open={open} setOpen={setOpen} />
      <Link href="/">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEmojiIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[70px] relative z-40"
          >
            {emojis[currentEmojiIndex]}
          </motion.div>
        </AnimatePresence>
      </Link>
      <div className="flex items-center w-full justify-end mr-4 gap-4">
        <Link href="/faucet" className="underline relative" style={{
          zIndex: 1000
        }}>
          Faucet
        </Link>
      </div>
      <Wallet className="relative z-50">
        <ConnectWallet withWalletAggregator className="bg-white hover:bg-white">
          <ConnectWalletText className="text-black">
            Connect Wallet
          </ConnectWalletText>
          <Avatar className="h-6 w-6 bg-black" />
          <Name className="text-black" />
        </ConnectWallet>
        <WalletDropdown className="border">
          <Identity className="px-4 pt-3 pb-2 text-black" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownLink
            className=""
            icon="wallet"
            href="https://keys.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <Link
            className="p-4 flex items-center gap-"
            href="/profile"
          >
            <PersonStanding />
            Profile
          </Link>
          <WalletDropdownDisconnect className="" />
        </WalletDropdown>
      </Wallet>
    </div >
  );
};

export default Navbar;
