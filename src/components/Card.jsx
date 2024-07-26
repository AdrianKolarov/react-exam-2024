

import styles from './Card.module.css';

export default function Card(){
    return <>
    
        <div className={styles.card}>
            <h2>#1</h2>
            <img src="https://render.worldofwarcraft.com/eu/character/outland/91/207653723-avatar.jpg?alt=/wow/static/images/2d/avatar/4-0.jpg" alt="class_icon"></img>
            <h2>Name: Fullepixx</h2>
            <h2>Server: Outland</h2>
            <div className={styles["card-bottom-part"]}>
            <p>Number of blacklists: 0</p>
            <button className={styles.blacklist}>Blacklist</button>
            
            </div>
        </div>
   
    </>
}