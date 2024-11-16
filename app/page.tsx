"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { BackgroundBeamsDemo } from "@/components/ui/title";
import Image from "next/image";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';


const HomePage = () => {
  const placeholders = [
    "eg:$WOJAK",
    "eg:$COPIUM",
    "eg:$NGMI",
    "eg:$FOMO",
    "eg:$WAGMI",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    // debugger
    // router.push(`/meme/?name=${username}`);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-h-screen pt-40 h-full overflow-hidden">
        <div className="max-w-[300px] flex items-center justify-center relative z-50 mx-auto">
          <Image src={"/images/rocket.png"} alt="rocket" width={70} height={70} />
          <Image src={"/images/unipump.png"} alt="pump" width={160} height={160} />
        </div>
        <Toaster />
        <BackgroundBeamsDemo />
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </Suspense>
  );
};

export default HomePage;
