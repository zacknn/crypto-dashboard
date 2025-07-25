'use client';
import useSWR from 'swr';
import CoinCard from './coin-card';
import { CoinMarket } from '../lib/difinitions';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CoinList() {
  const { data: coins, error, isLoading } = useSWR<CoinMarket[]>(
    '/api/coins',
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
    }
  );

  // This handles background refreshes after initial load
  if (isLoading && !coins) {
    return <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
      ))}
    </div>;
  }

  if (error) return <div className="text-red-500">Error loading data</div>;
  if (!coins) return <div>No data found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}