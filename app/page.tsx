"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeamsDemo, words } from "@/components/ui/title";
import useGetAllSales from "@/hooks/useGetAllSales";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';


const HomePage = () => {
  const { data } = useGetAllSales();

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
      <div className="max-h-screen pt-10 h-full overflow-hidden">
        <div className="max-w-[300px] flex items-center justify-center relative z-50 mx-auto">
          <Image src={"/images/rocket.png"} alt="rocket" width={70} height={70} />
          <Image src={"/images/unipump.png"} alt="pump" width={160} height={160} />
        </div>
        <Toaster />
        <div className="mx-auto max-w-[500px] text-center p-4">
          <TextGenerateEffect duration={2} filter={false} words={words} />
        </div>
        <TextGenerateEffect duration={2} filter={false} words={"Current Unicorn"} className="text-center md:text-3xl" />
        {data && data.filter(item => item.memeTokenAddress.toLowerCase() === "0x0f1aa5058a58e56d99365fbab232bef578a0ad2d".toLowerCase()).map((item) => (
          <Link href={`/token/?address=${item.memeTokenAddress}`}
            key={item.name}
          >
            <div
              className="w-[350px] max-w-full mt-8 z-50 mx-auto relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8  md:w-[450px]"
            >
              <div className="flex  items-start pt-3 space-x-4 justify-between">
                <Image src={item.imageUri} alt="Evervault" width={60} height={60} />
                <div>
                  <div className="flex items-center space-x-2 w-full justify-start">
                    <div className="text-sm">Created by </div>
                    <Image src={item.imageUri} alt="Evervault" width={14} height={14} /></div>
                  <div className="relative z-20 mt-2 flex flex-row items-center">
                    <span className="flex flex-col gap-1">
                      <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                        {item.name}
                      </span>
                      <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                        {item.bio}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
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
