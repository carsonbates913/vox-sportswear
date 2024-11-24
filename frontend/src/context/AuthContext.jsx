import { useState, useEffect, useContext, createContext} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initFirebase } from "../services/datastore.js";

const AuthContext = createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const app = initFirebase();
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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