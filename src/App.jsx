import './App.css';
import{ Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Restaurant from './pages/Restaurant/Restaurant';
import Cart from './pages/Cart/Cart';
function App() {

  const[filterType, setFilterType] =useState('');

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home filterType={filterType} setFilterType={setFilterType} />} />
        <Route path='/kolkata' element={<Home filterType={filterType} setFilterType={setFilterType} />} />
        <Route path='/kolkata/:restaurant/order/:id' element={<Restaurant />} /> 
        <Route path='/checkout' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
