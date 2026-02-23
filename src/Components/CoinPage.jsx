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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0E11] text-[#EAECEF]">
        Loading coin data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] px-[6%] py-10">

      <div className="flex items-center gap-4 mb-8 bg-[#151A21] border border-[#2B3139] p-6 rounded-xl shadow-sm">
        <img
          src={coinDetails.image?.large}
          alt={coinDetails.name}
          className="w-16 h-16"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#FCD535]">
            {coinDetails.name}
          </h1>
          <p className="text-[#848E9C]">
            ({coinDetails.symbol?.toUpperCase()})
          </p>
          <p className="text-sm text-[#848E9C]">
            Rank #{coinDetails.market_cap_rank}
          </p>
        </div>
      </div>

      <div className="bg-[#151A21] border border-[#2B3139] p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-[#FCD535] font-semibold tracking-wide">
            Price Chart
          </h2>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-[#0B0E11] border border-[#2B3139] px-4 py-1.5 rounded-lg text-sm focus:outline-none focus:border-[#FCD535]"
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

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#151A21] border border-[#2B3139] p-6 rounded-xl hover:border-[#FCD535]/40 transition">
          <p className="text-[#848E9C] text-sm mb-1">Current Price</p>
          <p className="text-2xl text-[#FCD535] font-bold">
            {CurrentCurrency.symbol}
            {coinDetails.market_data.current_price[
              CurrentCurrency.name
            ]?.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#151A21] border border-[#2B3139] p-6 rounded-xl hover:border-[#FCD535]/40 transition">
          <p className="text-[#848E9C] text-sm mb-1">Market Cap</p>
          <p className="text-2xl text-[#FCD535] font-bold">
            {CurrentCurrency.symbol}
            {coinDetails.market_data.market_cap[
              CurrentCurrency.name
            ]?.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#151A21] border border-[#2B3139] p-6 rounded-xl hover:border-[#FCD535]/40 transition">
          <p className="text-[#848E9C] text-sm mb-1">24h Change</p>
          <p
            className={`text-2xl font-bold ${
              coinDetails.market_data.price_change_percentage_24h > 0
                ? "text-[#0ECB81]"
                : "text-[#F6465D]"
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