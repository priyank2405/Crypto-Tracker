import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../Context/CryptoContext";
import AreaChart from "../Components/AreaChart";
import { ArrowUp, ArrowDown } from "lucide-react";

const CoinPage = () => {
  const { cryptoId } = useParams();
  const { CurrentCurrency } = useContext(CryptoContext);

  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [period, setPeriod] = useState("10");

  // Fetch coin details
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}`
        );
        const data = await res.json();
        setCoinDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCoin();
  }, [cryptoId]);

  // Fetch chart data
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${CurrentCurrency.name}&days=${period}`
        );
        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChart();
  }, [cryptoId, period, CurrentCurrency]);

  if (!coinDetails || !chartData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading coin data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-[5%] py-8">

      {/* Top coin info */}
      <div className="flex items-center gap-4 mb-6 bg-gray-800 p-4 rounded-xl">
        <img
          src={coinDetails.image?.large}
          alt={coinDetails.name}
          className="w-16 h-16"
        />
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">
            {coinDetails.name}
          </h1>
          <p className="text-gray-400">
            ({coinDetails.symbol?.toUpperCase()})
          </p>
          <p className="text-sm">Rank #{coinDetails.market_cap_rank}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <div className="flex justify-between mb-3">
          <h2 className="text-lg text-emerald-400">Price Chart</h2>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-gray-900 px-3 py-1 rounded"
          >
            <option value="1">24H</option>
            <option value="7">7D</option>
            <option value="30">30D</option>
            <option value="90">3M</option>
            <option value="365">1Y</option>
          </select>
        </div>

        <AreaChart
          historicalData={chartData}
          currencySymbol={CurrentCurrency.symbol}
        />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* price */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">Current Price</p>
          <p className="text-2xl text-emerald-400 font-bold">
            {CurrentCurrency.symbol}
            {coinDetails.market_data.current_price[
              CurrentCurrency.name
            ]?.toLocaleString()}
          </p>
        </div>

        {/* market cap */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">Market Cap</p>
          <p className="text-2xl text-emerald-400 font-bold">
            {CurrentCurrency.symbol}
            {coinDetails.market_data.market_cap[
              CurrentCurrency.name
            ]?.toLocaleString()}
          </p>
        </div>

        {/* 24h change */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400">24h Change</p>
          <p
            className={`text-2xl font-bold ${
              coinDetails.market_data.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;