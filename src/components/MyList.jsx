import styles from "./MyList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dungeon from "./Dungeon";
import { auth } from "../firebase/config";
import { addToUserBlacklist, fetchUserBlacklist, updateUserBlacklist } from "../store/userBlacklistSlice";
import { updateGlobalBlacklist, fetchGlobalBlacklist } from "../store/globalBlacklistSlice";
import Blacklist from "./Blacklist";

export default function MyList() {
  const dispatch = useDispatch();
  const selectedCharacter = useSelector(state => state.characters.selectedCharacter);
  const userBlacklist = useSelector(state => state.userBlacklist);
  const [runs, setRuns] = useState([]);
  const [playerDetails, setPlayerDetails] = useState([]);

  
  async function getPlayers(id) {
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = `https://raider.io/api/v1/mythic-plus/run-details?season=season-df-4&id=${id}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    return await response.json();
  }


  useEffect(() => {
    async function getDungeons() {
      const response = await fetch(`https://raider.io/api/v1/characters/profile?region=${selectedCharacter.region}&realm=${selectedCharacter.server}&name=${selectedCharacter.name}&fields=mythic_plus_recent_runs`);
      const json = await response.json();
      const recentRuns = json.mythic_plus_recent_runs.slice(0, 5);
      setRuns(recentRuns);

      const ids = recentRuns.map(run => run.url.split('/')[5].split('-')[0]);
      const playerDetailsArray = await Promise.all(ids.map(id => getPlayers(id)));
      
      
      const combinedPlayerDetails = playerDetailsArray.map(details =>
        details.roster.map(player => `${player.character.name}-${player.character.realm.name}`)
      );
      setPlayerDetails(combinedPlayerDetails);
    }

    if (selectedCharacter) {
      getDungeons();
      dispatch(fetchUserBlacklist());
      dispatch(fetchGlobalBlacklist());
    }
  }, [selectedCharacter, dispatch]);

  
  const handleBlacklist = (player) => {
    const [name, server] = player.split('-');
    const playerIdentifier = `${name}-${server}`;

 
    const isUserBlacklisted = userBlacklist.some(p => p.name === playerIdentifier);
    if (isUserBlacklisted) {
      alert(`You've already blacklisted ${playerIdentifier}`);
      return;
    }

    
    const addNote = window.confirm('Do you want to add a note for this player?');
    let playerNote = '';
    if (addNote) {
      playerNote = prompt('Enter a note (max 20 characters):', '').slice(0, 20);
    }

    
    const userBlacklistedPlayer = { name: playerIdentifier, note: playerNote || '' };
    dispatch(addToUserBlacklist(userBlacklistedPlayer));

    
    dispatch(updateGlobalBlacklist({
      name: playerIdentifier,
      count: 1,
      users: [auth.currentUser.uid],
    }));
  };

 
  const handleEditNote = (playerId) => {
    const player = userBlacklist.find(p => p.id === playerId);
    if (player) {
      
      const newNote = prompt('Edit note:', player.note).slice(0, 20);
      if (newNote !== null) {
        const updatedPlayer = { ...player, note: newNote };
        dispatch(updateUserBlacklist(updatedPlayer));
      }
    }
  };
 
  
  if (!selectedCharacter) {
    return <div className={styles.notSelected}><p>You need to select a character!</p></div>;
  }

  return       <>
      <div className={styles.wrapper}>
        <div className={styles["mythic-runs"]}>
          {runs.map((run, index) => (
            <Dungeon
              key={index}
              name={run.dungeon}
              level={run.mythic_level}
              players={playerDetails[index] || []}
              onBlacklist={handleBlacklist} 
            />
          ))}
        </div>

        <Blacklist userBlacklist={userBlacklist} handleEditNote={handleEditNote} />
      </div>
    </>
  
  
}
