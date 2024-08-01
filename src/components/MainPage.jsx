import styles from './MainPage.module.css';
import Card from './Card'
import { Link } from 'react-router-dom';
import { selectUsers } from '../store/usersSlice.js';
import { useSelector } from 'react-redux'


export default function MainPage() {
    
    
    const user = useSelector(selectUsers)
    
    
    return <>
    <p className={styles.para}>Welcome to the website where you can blacklist everyone you never want to see in your dungones again. To use just register or login, then import your character and click `select` to go to your personal latest dungeons list. There you can blacklist all the players you never want to see again!</p>
    {!user.currentUser ?
    <div className={styles.buttons}>
    <Link to="/login" id={styles.login}>Login</Link>
    <Link to="/register" id={styles.register}>Register</Link>

    
    </div>
    :
    <Link to="/import" id={styles.import}>Import your character</Link>
}
    <div className={styles.shame}>
        <h1>Hall of Shame</h1>
        <div className={styles.cards}>
            <Card />
                      
        </div>
    </div>
   
    </>
}