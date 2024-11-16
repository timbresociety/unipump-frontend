import { Avatar, Name } from '@coinbase/onchainkit/identity';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import {
    Transaction,
    TransactionButton,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel
} from '@coinbase/onchainkit/transaction';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useCallback } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';


export default function TransactionComponent({
    contractAddress,
    contractAbi,
    functionName,
    cta,
    args,
    handleOnStatus2,
    disabled,
}: {
    contractAddress: Address;
    functionName: string;
    args: any[];
    cta: string;
    disabled?: boolean;
    handleOnStatus2: (status: LifecycleStatus) => void;
    contractAbi: any;
}) {
    const { address, chainId } = useAccount();

    const handleOnStatus = useCallback((status: LifecycleStatus) => {
        handleOnStatus2(status);
    }, [handleOnStatus2]);

    const handleOnError = useCallback((error: any) => {
        console.log(error);
    }, []);

    return address && chainId ? (
        <Transaction
            key={cta}
            chainId={chainId}
            contracts={[{
                address: contractAddress,
                abi: contractAbi,
                functionName,
                args,
            }]}
            isSponsored={false}
            className='mt-4'
            onError={handleOnError}
            onStatus={handleOnStatus}
        >
            <TransactionButton disabled={disabled} className='bg-white hover:bg-white' text={cta} />
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