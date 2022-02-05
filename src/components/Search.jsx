import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useResultContext } from '../contexts/ResultContextProvider';
import Links from './Links';

const Search = () => {
  const [ text, setText ] = useState('Elon Musk');

  const { setSearchTerm, total, ts } = useResultContext();
  const [ debouncedValue ] = useDebounce(text,600);

  useEffect(() => {
    if(debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue]);
  

  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
      <input 
        value={text}
        type="text"
        className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        placeholder='Search webNest or type URL'
        onChange={(e) => setText(e.target.value)}
      />
        {!text && (
          <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => setText('')}>
            x
          </button>
      )}
      <Links />
      <div className='flex flex-row center m-4 text-blue-400 dark:text-blue-200'>
        <div className='text-sm text-center'>About {total} results</div>  
        <div className='text-sm text-center ml-1'>({ts} seconds)</div>  
      </div>
    </div>
  )
}

export default Search
