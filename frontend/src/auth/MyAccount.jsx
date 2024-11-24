import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFirebase } from '../services/datastore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { retrieveCartFromSession } from '../services/sessionStorage.js';
import { useAuth } from '../context/AuthContext.jsx';

const MyAccount = () => {

    const [cartProducts, setCartProducts] = useState([]);

    const {user, loading} = useAuth();

    const app = initFirebase();
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    const navigateTo = useNavigate();

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
            navigateTo('/homepage');
        }
    }

    const signOut = async () => {
        await auth.signOut();
        navigateTo('/homepage');
    }

    const updateCartFromSession = () => {
        let cart = retrieveCartFromSession();
        setCartProducts(cart);
    }

    useEffect(() => {
        updateCartFromSession();
        window.addEventListener('storage', updateCartFromSession);
        return () => {
            window.removeEventListener('storage', updateCartFromSession);
        };
    }, [])

    return (
        <div>
            {user ?
            <button onClick={signOut}>Log out</button>
            : <button onClick={signIn}>Log in with Google</button>
}
        </div>
    )
}

export default MyAccount;
