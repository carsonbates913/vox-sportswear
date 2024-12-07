import { useState, useEffect, useContext, createContext} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initFirebase, getUserData } from "../services/datastore.js";

const AuthContext = createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const app = initFirebase();
  const auth = getAuth(app)

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
  }, [])

  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}