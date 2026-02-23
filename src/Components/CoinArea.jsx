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

  if (!filteredCryptos || filteredCryptos.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center text-[#EAECEF]">
        Loading crypto data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] px-[6%] py-10">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#FCD535] tracking-wide">
          Crypto Market Intelligence
        </h1>
        <p className="text-[#848E9C] mt-2">Track real-time crypto prices</p>
      </div>


      <div className="flex justify-end mb-6 relative">
        <button
          onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
          className="flex items-center gap-2 bg-[#151A21] border border-[#2B3139] px-4 py-2 rounded-lg hover:border-[#FCD535] transition"
        >
          {CurrentCurrency.symbol}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isCurrencyDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCurrencyDropdownOpen && (
          <div className="absolute top-12 right-0 bg-[#151A21] border border-[#2B3139] rounded-lg shadow-xl z-50">
            {["usd", "eur", "inr"].map((code) => (
              <div
                key={code}
                className="px-4 py-2 hover:bg-[#1E2329] cursor-pointer"
                onClick={() => handleCurrencySelect(code)}
              >
                {code.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-[#151A21] border border-[#2B3139] rounded-lg text-[#848E9C]">
        <p>Rank</p>
        <p>Coin</p>
        <p>Price ({CurrentCurrency.symbol})</p>
        <p className="text-center">24H Change</p>
        <p className="text-right">Market Cap</p>
      </div>


      <div className="space-y-3">
        {filteredCryptos.slice(0, 50).map((item) => (
          <Link
            to={`/crypto/${item.id}`}
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 bg-[#151A21] border border-[#2B3139] rounded-lg hover:bg-[#1E2329] hover:scale-[1.01] transition-all duration-200"
          >

            <p className="text-[#FCD535] font-semibold">
              #{item.market_cap_rank ?? "N/A"}
            </p>


            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-8 h-8" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-[#848E9C]">
                  {item.symbol?.toUpperCase()}
                </p>
              </div>
            </div>


            <p className="font-medium">
              {CurrentCurrency.symbol}{" "}
              {item.current_price?.toLocaleString() || "N/A"}
            </p>


            <p
              className={`text-center font-semibold ${
                (item.price_change_percentage_24h ?? 0) > 0
                  ? "text-[#0ECB81]"
                  : "text-[#F6465D]"
              }`}
            >
              {(item.price_change_percentage_24h ?? 0) > 0 ? "▲" : "▼"}{" "}
              {Math.abs(item.price_change_percentage_24h ?? 0).toFixed(2)}%
            </p>


            <div className="text-right">
              <p className="font-medium">
                {CurrentCurrency.symbol}{" "}
                {item.market_cap?.toLocaleString() || "N/A"}
              </p>
              <p className="text-xs text-[#848E9C]">
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