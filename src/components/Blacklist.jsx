import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromUserBlacklist } from "../store/userBlacklistSlice";
import { removeFromGlobalBlacklist } from "../store/globalBlacklistSlice";
import Search from "./Search";
import styles from "./Blacklist.module.css";
import PropTypes from "prop-types";

export default function Blacklist({ userBlacklist, handleEditNote }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const handleMouseEnter = (player) => {
    setHoveredPlayer(player);
  };

  const handleMouseLeave = () => {
    setHoveredPlayer(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRemove = (player) => {
    dispatch(removeFromUserBlacklist(player.id))
    dispatch(removeFromGlobalBlacklist(player.name))
  }

  const filteredBlacklist = userBlacklist.filter((player) => {
    const searchTerm = searchQuery.toLowerCase();
    const playerName = player.name.toLowerCase();
    
    return (
      searchTerm === "" ||
      playerName.includes(searchTerm) 
    );
  });

  const last20Blacklisted = userBlacklist.slice(-20);
  const displayedPlayers = searchQuery === "" ? last20Blacklisted : filteredBlacklist;

  return (
    <div className={styles.blacklist}>
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ul className={styles.listOfNames}>
        {displayedPlayers.length > 0 ? (
          displayedPlayers.map((player, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(player)}
              onMouseLeave={handleMouseLeave}
              className={styles.listItem}
            >
              {player.name}
              {hoveredPlayer === player && player.note && (
                <div className={styles.note}>{player.note}</div>
              )}
              <div>
                <button onClick={() => handleEditNote(player.id)}>Edit</button>
                <button onClick={() => handleRemove(player)}>Remove</button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.empty}>Nothing to see here!</p>
        )}
      </ul>
    </div>
  );
}


Blacklist.propTypes = {
  handleEditNote: PropTypes.func.isRequired,
  userBlacklist: PropTypes.array.isRequired
}