import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
export default function NavBar(){
    return <>
    <div className={styles.navigation}>
    <Link to="/"> <img src="./public/mythicplus2.png"/></Link>
    <nav>
    <Link to ="/mylist">My List</Link>
    <Link to="/characters">Selected Character: None</Link>
    <Link to="/logout">Logout</Link>
    </nav>
    </div>
    </>
}