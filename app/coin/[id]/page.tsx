'use client';
import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getCoinDetails } from '@/app/lib/actions';
import { CoinDetail } from '@/app/lib/difinitions';
import { format } from 'date-fns';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';

export default function CoinDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [coin, setCoin] = React.useState<CoinDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Check if coin is in favorites on mount
  React.useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteCoins') || '[]') as string[];
    setIsFavorite(favoriteIds.includes(id));
  }, [id]);

  // Fetch coin details
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch coin details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteCoins') || '[]') as string[];
    if (favoriteIds.includes(id)) {
      const updatedFavorites = favoriteIds.filter((favId) => favId !== id);
      localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favoriteIds.push(id);
      localStorage.setItem('favoriteCoins', JSON.stringify(favoriteIds));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !coin) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        >
          {/* Header with Back Button, Coin Info, and Favorite Button */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to List
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Image
                src={coin.image.large}
                alt={coin.name}
                width={50}
                height={50}
                className="w-12 h-12"
                unoptimized={true}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{coin.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${isFavorite ? 'text-red-500 border-red-500' : ''}`}
              onClick={toggleFavorite}
            >
              <HeartIcon className="h-5 w-5" />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          {/* Price and Market Data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Price (USD)</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap (USD)</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume (USD)</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">24h Price Change</p>
              <p
                className={`text-lg font-semibold ${
                  coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {coin.market_data.price_change_percentage_24h >= 0 ? '+' : ''}
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <div
              className="text-gray-700 dark:text-gray-300 prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="text-gray-900 dark:text-white">
                {format(new Date(), 'PPPp')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </Suspense>
  );
}