import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes.jsx'
import AuthContext from './context/AuthContext.jsx'
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from './services/datastore.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import './App.css'

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = useCallback(new GoogleAuthProvider(), []);

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
            console.error("Error retrieving information about user", error);
            setUser(null);
          }
        }else{
          setUser(null);
        }
        setLoading(false);
      })

    return () => unsubscribe();
  }, [auth])

  if(loading){
    return <div>loading...</div>
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
