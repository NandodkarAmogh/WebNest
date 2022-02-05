import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import Loading from './Loading';

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation(); //images,news,videos
  useEffect(() => {
    if(searchTerm){
      if(location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&&num=50`);
      }
    }
  
  
  }, [searchTerm, location.pathname]);
  

  if(isLoading) return <Loading />;
  
  switch (location.pathname) {
    case '/search':
        return (
          <div className='flex flex-wrap justify-between space-y-6 sm:px-56 sm:m-4'>
            
            
            {results?.map(({ link, title, index, description}) => (
              <div key={index} className='md:w-2/5 w-full mt-5 '>
                <a href={link} target="_blank" rel='noreferrer'>
                  <p className='text-sm text-indigo-700 dark:text-indigo 300'>
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
          <div className='flex flex-wrap justify-center items-center'>
            {results?.map(({ image, link:{ href, title}, index}) => (
              <a className='sm:p-3 p-5' href={href} key={index} target='_blank'>
                <img src={image?.src} alt={title} loading="lazy" />
                <p className='w-36 break-words text-sm mt-2 dark:text-blue-200 text-blue-500'>
                  {title}
                </p>
              </a>
            ))}
          </div>
        )
      break;
    case '/news':
        return (
          <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
            {results?.map(({ links, title, id, source, published }) => (
              <div key={id} className='md:w-2/5 w-full'>
                <a href={links?.[0].href} target="_blank" rel='noreferrer' className='hover:underline'>
                  <p className='text-lg dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>
                <div className='flex gap-4'>
                  <a href={source?.href} target='_blank' rel='noreferrer' className="hover:underline hover:text-blue-300">
                    {source?.href}
                  </a>
                </div> 
                <p className='text-sm dark:text-blue-100 text-gray-500'>
                  {published}
                </p> 
              </div>
            ))}  
          </div>
        )
      break;
    case '/videos':
        return (
          <div className='flex flex-wrap'>
            {results.map((video,index) => (
              <div key={index} className='p-2'>
                {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px"/>}
              </div>
            ))}
          </div>
        )
      break;
  
    default:
      return 'ERROR!'
      break;
  }

  return (
    <div className='text-lg'>
      Results
    </div>
  )
}

export default Results
