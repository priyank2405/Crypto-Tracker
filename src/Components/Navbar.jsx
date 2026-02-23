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
    <nav className="flex items-center justify-between px-[8%] py-5 bg-[#0B0E11] border-b border-[#2B3139] sticky top-0 z-50">

      <div className="flex items-center gap-2">
        <Coins className="w-8 h-8 text-[#FCD535]" />
        <span className="text-xl font-bold text-[#FCD535]">
          CryptoTracker
        </span>
      </div>

      <form
        onSubmit={searchHandler}
        className="w-full max-w-2xl relative"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search crypto..."
            value={input}
            onChange={inputHandler}
            className="w-full px-6 py-3 bg-[#151A21] border border-[#2B3139] rounded-full focus:outline-none focus:ring-1 focus:ring-[#FCD535] text-[#EAECEF]"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-[#FCD535] text-black rounded-full"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {filteredCoins.length > 0 && (
          <ul className="absolute w-full bg-[#151A21] border border-[#2B3139] mt-2 rounded-lg shadow-xl z-10">
            {filteredCoins.map((coin, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-[#1E2329] cursor-pointer"
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