import { RouterProvider } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar.jsx';
import { useAuth } from './context/AuthContext.jsx'
import { router } from './routes/AppRoutes.jsx'
import './App.css'

function App() {

  const {user, loading} = useAuth();

  if(loading){
    return <div>loading...</div>
  }else{
    return (
      <>
        <RouterProvider router={router}>
        </RouterProvider>
      </>
    )
  }
}

export default App
