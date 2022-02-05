import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('tesla');
  const [total, setTotal] = useState('');
  const [ts,setTs] = useState('')

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'x-proxy-location': 'IN',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '0acf04ba65msh1fcb8e6e42cd3b7p1d3febjsn32ce491bdbf2',
      },
    });

    const data = await response.json();
    console.log(data);

    if(type.includes('/news')) {
      setResults(data.entries);
      // setNewsTotal(data.total);
    } else if(type.includes('/images')) {
      setResults(data.image_results);
      // setImagesTotal(data.total);
    } else {
      setResults(data.results);
      setTotal(data.total);
      setTs(data.ts)
    }

    setIsLoading(false);
  };
  
  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading, total, ts }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);