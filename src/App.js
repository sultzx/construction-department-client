import React from 'react'
import { Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {

  // const dispatch = useDispatch()

  // const isAuth = useSelector(selectIsAuth)

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe())
  // }, [])

  return (
    <>
      <Routes>
        <Route path='/login' element={<>Login</>}/>
        <Route path='/registration' element={<>Registration</>}/>
        <Route path='/' element={<>Main</>}/>
      </Routes>
    </>
  );
}

export default App;
