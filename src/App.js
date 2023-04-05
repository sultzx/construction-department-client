import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchAuthMe } from "./redux/slices/auth";
import Header from './components/Header/Header.jsx'

import Main from './pages/Main.jsx'
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Newspaper from './pages/Newspaper.jsx';
import NewsCRUDPanel from './components/News/NewsCRUDPanel.jsx';
import NewsCUPanel from './components/News/NewsUpdatePanel';
import NewsCreatePanel from './components/News/NewsCreatePanel.jsx';
import ChooseRegistration from './pages/ChooseRegistration';
import EntityRegister from './pages/EntityRegister';
import IndividualRegister from './pages/IndividualRegister';
import ChooseLogin from './pages/ChooseLogin';
import LoginEntity from './pages/LoginEntity';
import LoginIndividual from './pages/LoginIndividual';
import ProjectCRUDPanel from './components/Project/ProjectCRUDPanel.jsx';
import ProjectCreatePanel from './components/Project/ProjectCreatePanel.jsx';

function App() {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<ChooseLogin/>}/>
        <Route path='/login/for-entity' element={<LoginEntity/>}/>
        <Route path='/login/for-individual' element={<LoginIndividual/>}/>
        <Route path='/registration' element={<ChooseRegistration/>}/>
        <Route path='/registration/for-entity' element={<EntityRegister/>}/>
        <Route path='/registration/for-individual' element={<IndividualRegister/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/news' element={<Newspaper/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/news-crud-panel' element={<NewsCRUDPanel/>}/>
        <Route path='/news-crud-panel/create' element={<NewsCreatePanel/>}/>
        <Route path='/news-crud-panel/update/:id' element={<NewsCUPanel/>}/>

        <Route path='/project-crud-panel' element={<ProjectCRUDPanel/>}/>
        <Route path='/project-crud-panel/create' element={<ProjectCreatePanel/>}/>
        {/* <Route path='/project-crud-panel/update/:id' element={<ProjectCUPanel/>}/> */}
      </Routes>
    </>
  );
}

export default App;
