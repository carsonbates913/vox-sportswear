import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from './services/datastore.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import Homepage from './pages/Homepage/Homepage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import MyCart from './pages/MyCart/MyCart.jsx';
import Products from './pages/Products/Products.jsx';
import ViewProduct from './pages/Products/ViewProduct.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import { MyAccountRedirect } from './routes/ProtectedRoutes.jsx';
import LoadingModule from './components/LoadingModule/LoadingModule.jsx';
import { initFirebase } from './services/datastore.js';

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const app = initFirebase();
  const appCheck = initializeAppCheck(app, {provider: new ReCaptchaV3Provider('6LfpjRcrAAAAAC6y8bl0R5Q8ctKsNKQ7-Yz6_nSg'), isTokenAutoRefreshEnabled: true});

  const provider = useMemo(() => new GoogleAuthProvider(), []);

  const router = useMemo(() => createBrowserRouter([
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
  ]), [user]);

  const signIn = useCallback(async () => {
    try {
      // Check if the device is mobile (example: if the screen width is less than 768px)
      const isMobile = window.innerWidth <= 768;
  
      if (isMobile) {
        // Use redirect method for mobile devices
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup method for desktops
        const result = await signInWithPopup(auth, provider);
        return result.user;
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
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

  if(loading){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingModule show={loading} viewport/>
      </div> 
    )
  }else{
    return (
      <>
      <AuthContext.Provider value={{user, loading, signIn, signOut}}>
          <RouterProvider router={router} />
      </AuthContext.Provider>
      </>
    )
  }
}

export default App
