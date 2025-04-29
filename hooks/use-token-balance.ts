'use client'

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

interface UseTokenBalanceProps {
  tokenAddress?: `0x${string}`;
  enabled?: boolean;
}

export function useTokenBalance({ 
  tokenAddress,
}: UseTokenBalanceProps) {
  const { address: connectedAddress, isConnected } = useAccount();
  
  const { data: balanceData, isLoading, isError, error, refetch } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: connectedAddress ? [connectedAddress] : undefined,
    query: {
      enabled: Boolean(tokenAddress && connectedAddress && isConnected),
      gcTime: 5 * 60 * 1000, // 5 minutes
    }
  });

  return {
    balance: balanceData,
    isLoading,
    isError,
    error,
    refetch
  };
} 