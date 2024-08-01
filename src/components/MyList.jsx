import styles from "./MyList.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dungeon from "./Dungeon";

export default function MyList() {
  const selectedCharacter = useSelector(state => state.characters.selectedCharacter);
  const [runs, setRuns] = useState([]);
  const [playerDetails, setPlayerDetails] = useState([]);

  
  async function getPlayers(id) {
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = `https://raider.io/api/v1/mythic-plus/run-details?season=season-df-4&id=${id}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    console.log(response)
    return await response.json();
  }
  useEffect(() => {
    async function getDungeons() {
      
     

      const response = await fetch(`https://raider.io/api/v1/characters/profile?region=${selectedCharacter.region}&realm=${selectedCharacter.server}&name=${selectedCharacter.name}&fields=mythic_plus_recent_runs`);
      const json = await response.json();
      console.log("json: "+json)
      const recentRuns = json.mythic_plus_recent_runs.slice(0, 5);
      console.log("recent runs: "+recentRuns)
      setRuns(recentRuns);

      const ids = recentRuns.map(run => run.url.split('/')[5].split('-')[0]);

      const playerDetailsArray = await Promise.all(ids.map(id => getPlayers(id)));
      console.log("PlayerDetailsArray: "+playerDetailsArray)
      const combinedPlayerDetails = playerDetailsArray.map(detail => detail.roster.map(player => `${player.character.name}-${player.character.realm.name}`));

      setPlayerDetails(combinedPlayerDetails);
    }

    if (selectedCharacter) { 
      getDungeons();
    }
  }, [selectedCharacter]); 

  if (!selectedCharacter) {
    return <div>Please select a character to see the recent runs.</div>;
  }

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["mythic-runs"]}>
          {runs.map((run, index) => (
            <Dungeon
              key={index}
              name={run.dungeon}
              level={run.mythic_level}
              players={playerDetails[index]}
            />
          ))}
        </div>

        <div className={styles["blacklist"]}>
          <div className={styles["search-bar"]}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
            />
            <button>Search</button>
          </div>
          <ul className={styles.listOfNames}>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
            <li>Name-Server<button>remove</button></li>
          </ul>
        </div>
      </div>
    </>
  );
}