'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CoinMarket } from '../lib/difinitions';
import CoinCard from '../ui/coin-card';
import Loading from '@/app/loading';
import { getTopCoins } from '../lib/actions';


export default function FavoritesPage() {
  const [favoriteCoins, setFavoriteCoins] = useState<CoinMarket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteCoins') || '[]') as string[];
        if (favoriteIds.length === 0) {
          setFavoriteCoins([]);
          setIsLoading(false);
          return;
        }

        const coins = await getTopCoins();
        const filteredCoins = coins.filter((coin) => favoriteIds.includes(coin.id));
        setFavoriteCoins(filteredCoins);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch favorite coins');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-red-500 text-center">{error}</div>
      </main>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl text-center m-6 font-bold">Favorite Cryptocurrencies</h1>
          {favoriteCoins.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No favorite coins yet. Add some from the coin details page!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
              {favoriteCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </Suspense>
  );
}