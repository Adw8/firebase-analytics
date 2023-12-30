import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

import {auth} from '../firebase'

const UserContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState({})
    const createUser = async (email, password) =>{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCred.user;
        return user.uid;
        // console.log(uid);
    };

    const signIn = async (email, password) =>{
        const currentUser = await signInWithEmailAndPassword(auth, email, password);
        const user = currentUser.user;
        return user.uid;
    };

    const logout = () =>{
        return signOut(auth)
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            console.log(user);
        });
        return () =>{
            unsubscribe()
        };
    }, []);

    
    return(
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(UserContext);
}