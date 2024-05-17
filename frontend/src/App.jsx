import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import WeeklyForecast from "./components/WeeklyForecast"; // Import WeeklyForecast component

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/weekly-forecast' element={<WeeklyForecast />} /> {/* Add route for WeeklyForecast component */}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
