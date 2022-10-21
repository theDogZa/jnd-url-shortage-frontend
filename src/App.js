import React from 'react';
import {  Routes, Route, useNavigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from './component/registration.component';
import Home from './component/home.component.js';

import Login from './component/login.component';
import Page from './component/page.component';
import NotFoundPage from './component/notFoundPage.component';

function App() {

    let pathName = window.location.pathname
    const navigate = useNavigate();
    let token = sessionStorage.getItem("token");

  console.log(token,"--token")
  
    React.useEffect(() => {
      if (["/login", "/register"].includes(pathName)) {
        if (token) {
          navigate('/home')
        }
      } else if (["/", "/home"].includes(pathName)) {
        //console.log(token,"++token")
        if (!token) {
          navigate('/login')
        }
      }
    }, []);
  
      return (
        <div className="container">
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route path='/home' element={< Home />}></Route>
            <Route path='/login' element={< Login />}></Route>
            <Route path='/register' element={< Registration />}></Route>
            <Route path=':handle' element={< Page />}></Route>
            <Route path='404' element={< NotFoundPage />}></Route>
            <Route path='*' element={< NotFoundPage />}></Route>

          </Routes>
        </div>
      )
}

export default App;