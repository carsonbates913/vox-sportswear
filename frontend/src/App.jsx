import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import MyCart from './pages/MyCart/MyCart.jsx';
import Products from './pages/Products/Products.jsx';
import MyAccount from './auth/MyAccount.jsx';
import NavBar from './components/Navbar/Navbar.jsx';
import { initFirebase } from './services/datastore.js';
import { getAuth } from 'firebase/auth';
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

function App() {

  const {user, loading} = useAuth();

  if(loading){
    return <div>loading...</div>
  }else{
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/mycart" element={<MyCart/>}/>
            <Route path="/homepage" element={<Homepage/>}/>
            <Route path="/myaccount" element={<MyAccount/>}/>
            <Route path="/" element={<Homepage/>}/>
          </Routes>
        </Router>
      </>
    )
  }
}

export default App
