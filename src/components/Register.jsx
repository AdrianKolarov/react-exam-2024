
import styles from './Register.module.css';
import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register(){
  const [userCredentials, setUserCredentials] = useState({})
  const [error, setError] = useState('')


  function handleCredentials(e){
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    setError(error.message)
    console.log(userCredentials)
  }

  function handleSignUp(e){
    e.preventDefault()
    if(userCredentials.password != userCredentials.repassword){
      setError("Firebase: Error (password-missmatch)")
    }
    if(userCredentials.password === userCredentials.repassword && userCredentials.email != "" && userCredentials.password != "" && userCredentials.repassword != ""){
      createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log(user)
        
        })
        .catch((error) => {
        
        setError(error.message)
        
        // ..
        });
    }
  }



    return <>
    <div className={styles.form}>
    
          <h2>Register</h2>
          <form className={styles["register-form"]}>
            <input onChange={(e)=>{handleCredentials(e)}}
              type="text"
              name="email"
              id="register-email"
              placeholder="email"
            />
           
            <input onChange={(e)=>{handleCredentials(e)}}
              type="password"
              name="password"
              id="register-password"
              placeholder="password"
            />
            <input onChange={(e)=>{handleCredentials(e)}}
              type="password"
              name="repassword"
              id="repeat-password"
              placeholder="repeat password"
            />
            {
              error &&  <div className={styles.error}>
              {error}
            </div>
            }
           
            <button onClick={(e)=>{handleSignUp(e)}} type="submit">Register</button>
            <p className={styles.message}>Already registered? <a href="#">Login</a></p>
          </form>
        </div>
    </>
}