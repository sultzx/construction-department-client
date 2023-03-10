import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchAuthMe } from "./redux/slices/auth";
import Header from './components/Header/Header.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx';
import Main from './pages/Main.jsx'
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Newspaper from './pages/Newspaper.jsx';
import NewsCRUDPanel from './components/News/NewsCRUDPanel.jsx';
import NewsCUPanel from './components/News/NewsUpdatePanel';
import NewsCreatePanel from './components/News/NewsCreatePanel.jsx';

function App() {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/news' element={<Newspaper/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/news-crud-panel' element={<NewsCRUDPanel/>}/>
        <Route path='/news-crud-panel/create' element={<NewsCreatePanel/>}/>
        <Route path='/news-crud-panel/update/:id' element={<NewsCUPanel/>}/>
        
      </Routes>
    </>
  );
}

export default App;
