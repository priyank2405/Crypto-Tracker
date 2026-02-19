import { Coins, Search } from "lucide-react";
import { useContext, useState } from "react";
import { CryptoContext } from "../Context/CryptoContext";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const { cryptoList = [], setSearchTerm } = useContext(CryptoContext);

  const searchHandler = (event) => {
    event.preventDefault();
    setSearchTerm(input);
    setFilteredCoins([]);
  };

  const inputHandler = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
      setFilteredCoins([]);
    } else {
      const suggestions = cryptoList.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCoins(suggestions.slice(0, 5));
    }
  };

  return (
    <nav className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-[5%] md:px-[8%] lg:px-[10%] py-5 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/30 sticky top-0 z-50">

      <div className="flex items-center gap-2">
        <Coins className="w-8 h-8 text-emerald-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          CryptoTracker
        </span>
      </div>

      <form
        onSubmit={searchHandler}
        className="w-full md:w-auto flex-1 max-w-2xl relative"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search crypto..."
            value={input}
            onChange={inputHandler}
            className="w-full px-6 py-3 bg-gray-800/60 border border-gray-600/30 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 text-gray-200"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {filteredCoins.length > 0 && (
          <ul className="absolute w-full bg-gray-800 border border-gray-700 mt-2 rounded-lg shadow-xl z-10">
            {filteredCoins.map((coin, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-emerald-600/30 cursor-pointer text-gray-100"
                onClick={() => {
                  setInput(coin.name);
                  setFilteredCoins([]);
                  setSearchTerm(coin.name);
                }}
              >
                {coin.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </nav>
  );
};
