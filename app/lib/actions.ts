import api from "./api";
import { CoinMarket } from "./difinitions";

export const getTopCoins = async (): Promise<CoinMarket[]> => {
  const res = await api.get<CoinMarket[]>('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });
  return res.data;
};


