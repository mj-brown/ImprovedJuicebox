import { useState } from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import "./App.css";

function App() {
  const [userToken, setUserToken] = useState(null);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/account" element={<Account userToken={userToken} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
