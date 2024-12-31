
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import AllMovies from './Shows'
import ShowData from './ShowDetails'
import './shows.css';

const MainPage = () => {
  
  const [theme, setTheme] = useState('light'); // Theme state
  

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  return (
    <div className={`all-movies-container ${theme}`}>
      <div className="theme-toggle">
        <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        <label>
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="content">
      <Routes>
        <Route path="/" element={<AllMovies />} />     
        <Route path="show-data/:id" element={<ShowData />} />  
      </Routes>
      </div>
    </div>
  );
};

export default MainPage;
