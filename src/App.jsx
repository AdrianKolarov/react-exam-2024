import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import ImportCharacter from './components/ImportCharacter.jsx';
import Login from './components/Login.jsx';
import MyList from './components/MyList.jsx';
import NotFound from './components/NotFound.jsx';
import Characters from './components/Characters.jsx';
import Details from './components/Details.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config.js';
import { setUser } from './store/authSlice.js';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.uid));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/import" element={<ImportCharacter />} />

        {userId ? (
          <>
            <Route path="/mylist" element={<MyList />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/details" element={<Details />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
