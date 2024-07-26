import Card from "./Card";
import styles from "./Characters.module.css"
export default function Characters(){
    return <>
      <div className={styles.charWrapper}>
      <h1>My Characters</h1>
        <div className={styles.grid}>
          
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          

        </div>
      </div>

    </>
}