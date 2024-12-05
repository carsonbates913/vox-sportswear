import { BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx'
import NavBar from './components/Navbar/Navbar.jsx';
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
          <AppRoutes />
        </Router>
      </>
    )
  }
}

export default App
