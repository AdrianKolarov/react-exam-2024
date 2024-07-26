
import styles from './Login.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useState } from 'react';



export default function Login(){
  const [userCredentials, setUserCredentials] = useState({})
  const [error, setError] = useState('')

  function handleCredentials(e){
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    setError("")
    console.log(userCredentials)
  }
  
  function handleLogin(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
    // Signed in 
    console.log(userCredential.user);
    // ...
    })
    .catch((error) => {
      setError(error.message)
    });
  }
  
  return <>
  <div className="popup">
  
    <div className={styles.form}>
        
      <h2>Login</h2>
      <form className={styles["login-form"]}>
        <input onChange={(e)=>{handleCredentials(e)}} 
        type="text" 
        name="email" 
        id="email" 
        placeholder="email" 
        />

        <input onChange={(e)=>{handleCredentials(e)}}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
         {
              error &&  <div className={styles.error}>
              {error}
            </div>
            }
        <button onClick={(e)=>{handleLogin(e)}} type="submit" id="submit">Login</button>
        <p className={styles.message}>
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
    </div>
    </div>
    </>
}