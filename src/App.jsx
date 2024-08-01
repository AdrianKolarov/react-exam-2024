
import MainPage from './components/MainPage.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Register from './components/Register.jsx'

import ImportCharacter from './components/ImportCharacter.jsx'
import './App.css'
import Login from './components/Login.jsx'
import MyList from './components/MyList.jsx'
import { Route, Routes } from "react-router-dom"
import NotFound from './components/NotFound.jsx'
import Characters from './components/Characters.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from './store/authSlice.js'
import { auth } from './firebase/config.js'
import Details from './components/Details.jsx'





function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      if(user){
        dispatch(setUser(user.uid))
      } else {
        dispatch(setUser(null))
      }
    })
    return ()=>unsub()
  },[dispatch])
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/import" element={<ImportCharacter />}/>
        <Route path="/mylist" element={<MyList />}/>
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/*" element={<NotFound />}/>
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
      
        
    </>
  )
}

export default App
