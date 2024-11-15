import { Avatar, Name } from '@coinbase/onchainkit/identity';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useCallback } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';


export default function TransactionComponent({
    contractAddress,
    contractAbi,
    functionName,
    args,
}: {
    contractAddress: Address;
    functionName: string;
    args: any[];
    contractAbi: any;
}) {
    const { address, chainId } = useAccount();

    const handleOnStatus = useCallback((status: LifecycleStatus) => {
        console.log('LifecycleStatus', status);
    }, []);

    return address && chainId ? (
        <Transaction
            chainId={chainId}
            contracts={[
                {
                    address: contractAddress,
                    abi: contractAbi,
                    functionName,
                    args,
                }
            ]}
            className='mt-4'
            onStatus={handleOnStatus}
        >
            <TransactionButton className='bg-white hover:bg-white' text="Submit" />
            <TransactionSponsor />
            <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
            </TransactionStatus>
        </Transaction>
    ) : (
        <Wallet>
            <ConnectWallet>
                <Avatar className='h-6 w-6' />
                <Name />
            </ConnectWallet>
        </Wallet>
    );
};