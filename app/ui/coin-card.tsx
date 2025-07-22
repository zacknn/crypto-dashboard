'use client';
import { CoinMarket } from "../lib/difinitions";

export default function CoinCard({ coin }: { coin: CoinMarket }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h2>
          <p className="text-sm text-gray-500">Rank #{coin.market_cap_rank}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">${coin.current_price.toLocaleString()}</p>
        <p className={coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
