import { use } from 'react';
import { getTopCoins } from '../lib/actions';
import CoinCard from './coin-card';
import { notFound } from 'next/navigation';

export default function CoinList() {
  const coins = use(getTopCoins());

  if (!coins || coins.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-4">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
