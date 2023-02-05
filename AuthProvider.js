import {useState, createContext} from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [auth, useAuth] = useState(false);
    const [authUser, setAuthUser] = useState({})
    return(
        <AuthContext.Provider value={{auth, useAuth, authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    );
}