import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { setUser } from '../store/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUsers } from '../store/usersSlice.js';
import { useSelector } from 'react-redux'
import { resetSelectedCharacter } from '../store/characterSlice.js';


export default function NavBar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUsers)
    function handleSignOut(){
        if(confirm('Are you sure you want to log out?')){
        signOut(auth).then(()=>{
            dispatch(setUser(null))
            dispatch(resetSelectedCharacter())
            navigate('/')
            

        }).catch((error) => {
            console.log(error)
        })
    }
    }

    const selectedCharacter = useSelector(state=>state.characters.selectedCharacter)

    return <>
    <div className={styles.navigation}>
    <Link to="/"> <img src="/mythicplus2.png"/></Link>
    <nav>
    {user.currentUser ?
    <>
    <Link to ="/mylist">My List</Link>
    <Link to="/characters">Selected Character: {selectedCharacter ? `${selectedCharacter.name}-${selectedCharacter.server}` : 'None'}</Link>
    <Link onClick={handleSignOut} to="/logout">Logout</Link>
    </> : null
    }   

    </nav>
    </div>
    </>
}