import styles from "./Dungeon.module.css"
import PropTypes from "prop-types"


export default function Dungeon({ name, level, players }) {
    return (
      <div className={styles["dungeon-wrapper"]}>
        <h3>{name} +{level}</h3>
        <ul className={styles["members-list"]}>
          {players.map((player, index) => (
            <li key={index}>{player}<button>blacklist</button></li>
          ))}
        </ul>
      </div>
    );
  }

  Dungeon.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  Dungeon.defaultProps = {
    players: [],
  }