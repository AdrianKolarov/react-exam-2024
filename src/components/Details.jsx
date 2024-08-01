import styles from "./Details.module.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Details(){

    const location = useLocation()
    const { character } = location.state || {}
    const [details, setDetails] = useState(null)
    const navigate = useNavigate()
    console.log("Details component rendered", { character });

    useEffect(()=>{
        if(character){
            const fetchCharacterDetails = async () => {
                try{
                    const response = await fetch(`https://raider.io/api/v1/characters/profile?region=${character.region}&realm=${character.server}&name=${character.name}`)
                    const data = await response.json()
                    setDetails(data)
                } catch {
                    console.error('Error getting char details')
                }
            }
            fetchCharacterDetails()
        }
    },[character])  
    if(!details) {
        return <p>Loading...</p>
    }

    const handleBack = () =>{
        navigate('/characters')
    }
    return  <>
            <div className={styles.container}>
            <img src={details.thumbnail_url} alt={`${details.name}'s thumbnail`} />
            <div className={styles.info}>
                <h1>Name: {details.name}</h1>
                <h2>Server: {details.realm}</h2>
                <h2>Class: {`${details.active_spec_name} ${details.class}`}</h2>
                <h2>Faction: {details.faction.toUpperCase()}</h2>
                <h2>Gender: {details.gender.toUpperCase()}</h2>
                <h2>Achievement Points: {details.achievement_points}</h2>
                <h2>Last Log in: {details.last_crawled_at.slice(0,10)}</h2>
            </div>
            <button className={styles.backButton} onClick={handleBack}>X</button>
        </div>

        </>

}