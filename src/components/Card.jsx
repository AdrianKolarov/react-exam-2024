import styles from './Card.module.css';
import PropTypes from "prop-types";


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
                  <p>Number of blacklists: {character.count}</p>
                  
              </div>
          )}
          {!showBlacklist && (
              <div className={styles["card-bottom-part"]}>
                  <button className={styles.select} onClick={() => onSelect(character)}>Select</button>
                  <button className={styles.delete} onClick={() => onDelete(character.id)}>Delete</button>
              </div>
          )}
          {!showBlacklist &&(<button className={styles.details} onClick={onDetails}>Details</button>)}
      </div>
  );
       
    
}

Card.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        server: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
       
    }).isRequired,
    showBlacklist: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
};