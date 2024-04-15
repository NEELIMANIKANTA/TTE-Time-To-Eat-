import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/navstyles.css';
import {Provider} from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Veg from './veg/veg';
import store from './Store/Store';
import Cart from './components/Cart';



const Routing = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/veg" element={<Veg />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
