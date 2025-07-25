import { Suspense } from 'react';
import CoinList from './ui/coin-list';
import Loading from './loading';

export default function Home() {
  return (
    <>
      <h1 className='text-2xl text-center m-6 font-bold'>Top 10 Cryptocurrencies</h1>
      <main className="mt-4">
        <Suspense fallback={<Loading />}>
          <CoinList />
        </Suspense>
      </main>
    </>
  );
}