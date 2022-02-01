import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import { ResultContextProvider } from './contexts/ResultContextProvider';
import './global.css';

ReactDOM.render(
    <ResultContextProvider>
        <Router>
            <App />
            <Routes>
                <Route path= "/" element= {<Navigate to='/search'/>} />
            </Routes>
        </Router>
    </ResultContextProvider>, 

document.getElementById('root')
);
