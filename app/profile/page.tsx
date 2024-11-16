'use client'
import { CryptoProfile } from "@/components/crypto-profile";
import { CryptoTabs } from "@/components/crypto-tabs";

const ProfilePage = () => {
  return <div className=" pt-40 h-full mx-auto overflow-hidden">
    <div className="max-w-[450px] mx-auto ">
      <CryptoProfile />
      <CryptoTabs />
    </div>
  </div>
};

export default ProfilePage;