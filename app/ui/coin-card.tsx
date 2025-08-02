'use client';
import { CoinMarket } from '../lib/difinitions';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import  Link  from "next/link";
import { Button } from "@/components/ui/button";

export default function CoinCard({ coin }: { coin: CoinMarket }) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  
  return (
    <div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Coin Info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative flex-shrink-0">
            <Image
              src={coin.image}
              alt={coin.name}
              width={40}
              height={40}
              className="w-10 h-10"
              unoptimized={true}
            />
            <span className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded-full px-2 py-0.5">
              #{coin.market_cap_rank}
            </span>
          </div>
          
          <div className="min-w-0">
            <motion.h3 
              className="font-bold text-gray-900 dark:text-white truncate"
              whileHover={{ x: 2 }}
            >
              {coin.name}
            </motion.h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${coin.current_price.toLocaleString()}
          </p>
          <motion.div
            className={`flex items-center justify-end gap-1 ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span>{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
          </motion.div>
        </div>
      </div>

      {/* Price Chart Placeholder (optional) */}
      <motion.div 
        className="mt-4 h-1 bg-gradient-to-r from-gray-100 to-gray-100 dark:from-gray-700 dark:to-gray-700 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div 
          className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(Math.abs(coin.price_change_percentage_24h), 100)}%` }}
        />
      </motion.div>
      <Link href={`/coin/${coin.id}`}>
        <Button className="mt-4 w-full" variant="outline">
          View Details
        </Button>
      </Link>
    </motion.div>
      
    </div>
  );
}