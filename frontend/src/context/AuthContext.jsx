import { useContext, createContext} from 'react'

const AuthContext = createContext();

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
}