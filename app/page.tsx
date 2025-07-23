import { Suspense } from 'react';
import CoinList from './ui/coin-list';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h1>

      <Suspense fallback={<p className="animate-pulse">Loading coins...</p>}>
        <CoinList />
      </Suspense>
    </main>
  );
}

