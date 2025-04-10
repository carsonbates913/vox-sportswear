import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from './services/datastore.js';

const Homepage = lazy(() => import('./pages/Homepage/Homepage.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs.jsx'));
const MyCart = lazy(() => import('./pages/MyCart/MyCart.jsx'));
const Products = lazy(() => import('./pages/Products/Products.jsx'));
const ViewProduct = lazy(() => import('./pages/Products/ViewProduct.jsx'));
const RootLayout = lazy(() => import('./layouts/RootLayout.jsx'));
import { MyAccountRedirect } from './routes/ProtectedRoutes.jsx';
import LoadingModule from './components/LoadingModule/LoadingModule.jsx';

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Suspense fallback={<LoadingModule viewport/>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthContext.Provider>
      </>
    )
  }
}

export default App
