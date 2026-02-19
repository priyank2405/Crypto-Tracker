import { useContext, useState } from "react";
import { CryptoContext } from "../Context/CryptoContext";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const CoinArea = () => {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const { filteredCryptos, CurrentCurrency, setCurrentCurrency } =
    useContext(CryptoContext);

  const handleCurrencySelect = (selectedCurrency) => {
    switch (selectedCurrency) {
      case "usd":
        setCurrentCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrentCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrentCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrentCurrency({ name: "usd", symbol: "$" });
    }
    setIsCurrencyDropdownOpen(false);
  };

  // Loader safety
  if (!filteredCryptos || filteredCryptos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading crypto data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-[5%] py-10">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-emerald-400">
          Crypto Market Intelligence
        </h1>
      </div>

      {/* Currency Dropdown */}
      <div className="flex justify-end mb-6 relative">
        <button
          onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
          className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg"
        >
          {CurrentCurrency.symbol}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isCurrencyDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCurrencyDropdownOpen && (
          <div className="absolute top-12 right-0 bg-gray-800 rounded-lg shadow-lg z-50">
            {["usd", "eur", "inr"].map((code) => (
              <div
                key={code}
                className="px-4 py-2 hover:bg-emerald-600/30 cursor-pointer"
                onClick={() => handleCurrencySelect(code)}
              >
                {code.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-gray-800 rounded-lg">
        <p>Rank</p>
        <p>Coin</p>
        <p>Price ({CurrentCurrency.symbol})</p>
        <p className="text-center">24H Change</p>
        <p className="text-right">Market Cap</p>
      </div>

      {/* Coin List */}
      <div className="space-y-3">
        {filteredCryptos.slice(0, 50).map((item) => (
          <Link
            to={`/crypto/${item.id}`}
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            {/* Rank */}
            <p className="text-emerald-400">
              #{item.market_cap_rank ?? "N/A"}
            </p>

            {/* Coin */}
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-8 h-8" />
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.symbol?.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Price */}
            <p>
              {CurrentCurrency.symbol}{" "}
              {item.current_price?.toLocaleString() || "N/A"}
            </p>

            {/* 24h change */}
            <p
              className={`text-center ${
                (item.price_change_percentage_24h ?? 0) > 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {(item.price_change_percentage_24h ?? 0) > 0 ? "▲" : "▼"}{" "}
              {Math.abs(item.price_change_percentage_24h ?? 0).toFixed(2)}%
            </p>

            {/* Market cap + volume */}
            <div className="text-right">
              <p>
                {CurrentCurrency.symbol}{" "}
                {item.market_cap?.toLocaleString() || "N/A"}
              </p>
              <p className="text-xs text-gray-400">
                Vol: {CurrentCurrency.symbol}{" "}
                {item.total_volume?.toLocaleString() || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinArea;
