import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import Loading from './Loading';

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); //images,news,videos

  useEffect(() => {
    getResults('/search/q=elon musk&num=40');
  
  
  }, []);
  

  if(isLoading) return <Loading />;
  console.log(location.pathname)
  
  switch (location.pathname) {
    case '/search':
        return (
          <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
            {results?.results?.map(({ link, title, index, description}) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={link} target="_blank" rel='noreferrer'>
                  <p className='text-sm'>
                    {link.length> 30 ? link.substring(0,30) : link}
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>
                <p className='text-md dark:text-blue-100 text-gray-500'>
                    {description}
                </p>  
              </div>
            ))}  
          </div>
        )
      break;
    case '/images':
        return (
          <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
            {/* {results?.results?.map(({ link, title, index}) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={link} target="_blank" rel='noreferrer'>
                  <p className='text-sm'>
                    {link.length> 30 ? link.substring(0,30) : link}
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>  
              </div>
            ))}   */}
          </div>
        )
      break;
    case '/news':
        return 'SEARCH'
      break;
    case '/videos':
        return 'SEARCH'
      break;
  
    default:
      return 'ERROR!'
      break;
  }
}

export default Results
