'use client';

import { useEffect, useState } from 'react';
import { getTopCoins } from './lib/actions';
import { CoinMarket } from './lib/difinitions';
import CoinCard from './ui/coin-card';

export default function Home() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCoins();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Top 10 Cryptocurrencies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
      )}
    </main>
  );
}
