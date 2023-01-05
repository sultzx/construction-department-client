import React from 'react'
import { Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import Header from './components/Header/Header.jsx';
import Main from './pages/Main.jsx'

function App() {

  // const dispatch = useDispatch()

  // const isAuth = useSelector(selectIsAuth)

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe())
  // }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<>Login</>}/>
        <Route path='/registration' element={<>Registration</>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </>
  );
}

export default App;
