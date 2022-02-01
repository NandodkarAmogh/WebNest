import React from 'react';
import { useRoutes } from 'react-router-dom'
import Results from './Results';



const Routess = () => {
  const routess = useRoutes([
    { path: "/", element: <Results/> },
    { path: "/search", element: <Results/> },
    { path: "/images", element: <Results/> },
    { path: "/news", element: <Results/> },
    { path: "/videos", element: <Results/> }
  ])
  
  return routess;
}

export default Routess
