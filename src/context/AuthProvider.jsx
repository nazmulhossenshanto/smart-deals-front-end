import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

 const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user with email password
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    // login user with email and password
    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign in with google
    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    // sign out an user 
    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth)
    }
    // onAuthState changed

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{ 
                setUser(currentUser)
                // if(currentUser){
                //     fetch('http://localhost:3000/getToken', {
                //         method: 'POST',
                //         headers: {
                //             'content-type' : 'application/json'
                //         },
                //         body: JSON.stringify(currentUser)
                //     })
                //     .then(res => res.json())
                //     .then(data=>{
                //         console.log('after getting token', data);
                //         localStorage.setItem('token', data)
                //     })
                // }else{
                //     localStorage.removeItem('token')
                // }
                setLoading(false)
             
        });
        return ()=> unsubscribe();
    }, [])


    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading

    }

  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider