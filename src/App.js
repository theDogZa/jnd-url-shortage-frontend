import React from 'react';
import {  Routes, Route, useNavigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from './component/registration.component';
import Home from './component/home.component.js';

import Login from './component/login.component';
import Page from './component/page.component';
import NotFoundPage from './component/notFoundPage.component';
import Header from './component/header.component.js';
import NavUser from './component/navuser.component.js';

function App() {

    let pathName = window.location.pathname
    const navigate = useNavigate();
    let token = sessionStorage.getItem("token");

  console.log(pathName,'pathName');
  
  
    React.useEffect(() => {
      if (["/login", "/register"].includes(pathName)) {
        if (token) {
          navigate('/home')
        }
      } else if (["/", "/home"].includes(pathName)) {
        if (!token) {
          navigate('/login')
        }
      }
    }, []);
  
      return (
        <div className="container">
          <NavUser/>
          <Header />
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/home' element={< Home />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Registration />}></Route>
            <Route exact path='/404' element={< NotFoundPage />}></Route>
            <Route exact path='/:handle' element={< Page />}></Route>
            <Route exact path='*' element={< NotFoundPage />}></Route>
          </Routes>
        </div>
      )
}

export default App;