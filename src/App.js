import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import Header from './components/Header/Header.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx';
import Main from './pages/Main.jsx'
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';

function App() {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
