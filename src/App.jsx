
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
function App() {
 

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/import" element={<ImportCharacter />}/>
        <Route path="/mylist" element={<MyList />}/>
        <Route path="/*" element={<NotFound />}/>
        <Route path="/characters" element={<Characters/>}/>
      </Routes>
      <Footer />
      
        
    </>
  )
}

export default App
