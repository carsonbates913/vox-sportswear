import { useState, useEffect } from 'react';
import { initFirebase } from '../services/datastore.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const app = initFirebase();
  const auth = getAuth(app);

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })

    return () => unsubscribe()

  }, [auth]); 

  return {user, loading};
};