import { useState, useEffect, useCallback, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './services/datastore.js';

import Homepage from './pages/Homepage/Homepage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import MyCart from './pages/MyCart/MyCart.jsx';
import Products from './pages/Products/Products.jsx';
import ViewProduct from './pages/Products/ViewProduct.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import { MyAccountRedirect } from './routes/ProtectedRoutes.jsx';
import LoadingModule from './components/LoadingModule/LoadingModule.jsx';

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = useMemo(() => new GoogleAuthProvider(), []);

  const signIn = useCallback(async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error - ", error);
    }
  }, [provider]);

  const signOut = useCallback(async () => {
    const result = await auth.signOut();
    return result;
  }, []); 

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser){
          try {
            const token = await currentUser.getIdTokenResult();
            const isAdmin = token.claims.isAdmin || false;
            setUser({...currentUser, isAdmin})
          } catch (error) {
            setUser(null);
          }
        }else{
          setUser(null);
        }
        setLoading(false);
      }) 

    return () => unsubscribe();
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Homepage />,
          errorElement: <div>Page not found</div>,
        },
        {
          path: '/aboutus',
          element: <AboutUs />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/products/:productName',
          element: <ViewProduct />,
        },
        {
          path: '/mycart',
          element: <MyCart />,
        },
        {
          path: '/myaccount',
          element: <MyAccountRedirect user={user} />,
        },
      ]
    }
  ])

  if(loading){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingModule />
      </div> 
    )
  }else{
    return (
      <>
      <AuthContext.Provider value={{user, loading, signIn, signOut}}>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthContext.Provider>
      </>
    )
  }
}

export default App
