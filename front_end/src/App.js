import React, { useState } from 'react';
import {Route , Routes , BrowserRouter as Router} from "react-router-dom";
import Home from './views/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.css';

function App() {
  
  const [loggedInStatus, setloggedInStatus] = useState(false);
  const [user, setCount] = useState({});

  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
