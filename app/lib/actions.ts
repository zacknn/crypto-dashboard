import axios from "axios";
import { fetchTopCoin , fetchCoinDetail } from "./api";
import { CoinMarket , CoinDetail } from "./difinitions";
import {cache} from 'react';
import { th } from "framer-motion/client";
export const getTopCoins = cache(async (): Promise<CoinMarket[]> => {
  try {
    const res = await fetchTopCoin.get<CoinMarket[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return res.data;
  } catch (error: any) {
    // because i refresh the page many times the api is rate limited and i didint now and i thought it was a bug
    // so i added this error handling to show a human readable message
    // and not the axios error message
    // this is a good practice to handle errors in a user-friendly way
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      // Optional: You can log all the error info for debugging
      console.error(" Axios Error:", {
        message: error.message,
        status: status,
        url: error.config?.url,
      });

      // Human-readable messages based on status
      if (status === 429) {
        throw new Error("You're making too many requests. Please slow down.");
      } else if (status === 404) {
        throw new Error("The resource was not found.");
      } else if (status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred. Try again.");
      }
    } else {
      // Not an Axios error (e.g. unexpected bug)
      console.error("Unexpected error:", error);
      throw new Error("Something went wrong.");
    }
  }
});

export const getCoinDetails = async (id:string) : Promise<CoinDetail> => {
  try {
    const res = await fetchCoinDetail.get<CoinDetail>(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return res.data;
  }catch (error:any){
    console.error("Error fetching coin details:", error);
    throw new Error("Failed to fetch coin details.");
  }
}


