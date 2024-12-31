import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AllMovies from './Shows'
import { Link, Routes, Route } from 'react-router-dom';
import MainPage from './mainpage'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        {/* <Route path="/show-data/:id" element={<ShowData />} />   */}
      </Routes>
        
    </div>

  )
}

export default App
