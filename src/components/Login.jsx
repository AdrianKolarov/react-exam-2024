
import styles from './Login.module.css';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { useNavigate, Link } from 'react-router-dom';



export default function Login(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userCredentials, setUserCredentials] = useState({})
  const [error, setError] = useState('')

  onAuthStateChanged(auth, (user)=>{
    if(user) {
      
      dispatch(setUser({id: user.uid, email: user.email}))
      navigate('/')
     
    } else {
      dispatch(setUser(null))
    }
  })

  function handleCredentials(e){
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    setError("")
    console.log(userCredentials)
  }
  
  function handleLogin(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
    dispatch(setUser({id: userCredential.user.uid, email: userCredential.user.email}))
    navigate('/')
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
          Not registered? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
    </div>
    </>
}