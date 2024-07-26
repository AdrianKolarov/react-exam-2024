import styles from "./MyList.module.css"
import { useEffect, useState } from "react"
import Dungeon from "./Dungeon"
export default function MyList(){
 const [runs, setRuns] = useState([])

 const [playerDetails, setPlayerDetails] = useState([]);
  
  useEffect(()=>{
    async function getDungeons(){
      
      
      const response = await fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=Outland&name=fullepixx&fields=mythic_plus_recent_runs`)
      const json = await response.json()
      const recentRuns = json.mythic_plus_recent_runs.slice(0, 5);
      setRuns(recentRuns)
     //photo url console.log(json.thumbnail_url)
      const ids = recentRuns.map(run=>run.url.split('/')[5].split('-')[0])
     
      
      
      async function getPlayers(id) {
        
        const res = await fetch(`https://raider.io/api/v1/mythic-plus/run-details?season=season-df-4&id=${id}`);
       
        return await res.json();
      }
      const playerDetailsArray = await Promise.all(ids.map(id => getPlayers(id)));
      const combinedPlayerDetails = playerDetailsArray.map(detail=>{return detail.roster.map(player => `${player.character.name}-${player.character.realm.name}`)})
      
      console.log(combinedPlayerDetails)
      setPlayerDetails(combinedPlayerDetails); 
      console.log(playerDetails)
    }
    
    getDungeons()
},[])
   return <>
   <div className={styles["wrapper"]}>
        <div className={styles["mythic-runs"]}>
        {runs.map((run, index) => (
          <Dungeon key={index} name={run.dungeon} level={run.mythic_level} players={playerDetails[index]}
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
}