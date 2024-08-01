import styles from './Card.module.css';



export default function Card({character = {}, showBlacklist, onDelete, onSelect, onDetails}){

    if(!character){
      return <div>You have not imported any characters</div>
    }
       
     const imgClass = !showBlacklist ? styles.card : `${styles.card} ${styles.cardWithPadding}`
    return (
      <div className={styles.card}>
          {showBlacklist && (
              <h2>#{character.index + 1}</h2> 
          )}
          <img className={showBlacklist ? '' : styles.imgClass}
              src={character.thumbnail} 
              alt="class_icon"
          />
          <h2>Name: {character.name}</h2>
          <h2>Server: {character.server}</h2>
          {showBlacklist && (
              <div className={styles["card-bottom-part"]}>
                  <p>Number of blacklists: {character.blacklists}</p>
                  <button className={styles.blacklist} onClick={() => onDelete(character.id)}>Delete</button>
              </div>
          )}
          {!showBlacklist && (
              <div className={styles["card-bottom-part"]}>
                  <button className={styles.select} onClick={() => onSelect(character)}>Select</button>
                  <button className={styles.delete} onClick={() => onDelete(character.id)}>Delete</button>
              </div>
          )}
          <button className={styles.details} onClick={onDetails}>Details</button>
      </div>
  );
       
    
}