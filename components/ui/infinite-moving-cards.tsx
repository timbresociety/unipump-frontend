"use client";

import useGetAllSales from "@/hooks/useGetAllSales";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        image: string;
        name: string;
        id: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const { data } = useGetAllSales();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller fixed bottom-0 z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {data && data.filter(item => item.memeTokenAddress.toLowerCase() !== "0x0f1aa5058a58e56d99365fbab232bef578a0ad2d".toLowerCase()).map((item) => (
                    <Link href={`/token/?address=${item.memeTokenAddress}`}
                        key={item.name}
                    >
                        <li
                            className="w-[350px] max-w-full z-50 relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
                        >
                            <div className="flex  items-start pt-3 space-x-4 justify-between">
                                <Image src={item.imageUri} alt="Evervault" width={100} height={100} />
                                <div>
                                    <div className="flex items-center space-x-2 w-full justify-start">
                                        <div className="text-sm">Created by </div>
                                        <Image src={item.imageUri} alt="Evervault" width={14} height={14} /></div>
                                    <span className=" relative z-20 text-[20px] leading-0 text-gray-100 font-normal">
                                        {item.symbol}
                                    </span>
                                    <div className="relative z-20 mt-6 flex flex-row items-center">
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
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
