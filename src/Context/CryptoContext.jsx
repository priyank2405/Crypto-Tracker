import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext();

const CryptoContextProvider = (props) => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [CurrentCurrency, setCurrentCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

const fetchCryptoData = async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${CurrentCurrency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
    );

    const data = await res.json();
    console.log("API DATA:", data);


    setCryptoList(data);
    setFilteredCryptos(data);

  } catch (error) {
    console.log(error);
  }
};


 useEffect(() => {
  fetchCryptoData();

  const interval = setInterval(() => {
    fetchCryptoData();
  }, 30000); // every 30 sec

  return () => clearInterval(interval);
}, [CurrentCurrency]);


  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCryptos(cryptoList);
    } else {
      setFilteredCryptos(
        cryptoList.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [cryptoList, searchTerm]);

  const contextValue = {
    cryptoList,
    filteredCryptos,
    CurrentCurrency,
    setCurrentCurrency,
    searchTerm,
    setSearchTerm,
  };

  return (
    <CryptoContext.Provider value={contextValue}>
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;
