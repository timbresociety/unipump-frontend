"use client"
import Navbar from '@/components/layout/Navbar';
import { useWagmiConfig } from '@/wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { type State, WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing

export function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const wagmiConfig = useWagmiConfig();
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={wagmiConfig} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                <OnchainKitProvider
                    apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                    chain={baseSepolia}
                >
                    <RainbowKitProvider modalSize="compact">
                        <Toaster />
                        <Navbar />
                        {props.children}
                    </RainbowKitProvider>
                </OnchainKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}