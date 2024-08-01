import { useDispatch, useSelector } from "react-redux";
import { deleteCharacter, fetchCharacters, selectCharacter } from "../store/characterSlice";
import Card from "./Card";
import styles from "./Characters.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Characters(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const characters = useSelector((state) => state.characters.items);
useEffect(()=>{
    dispatch(fetchCharacters())
}, [dispatch])
  const handleDelete = (id) => {
    dispatch(deleteCharacter(id))
  }

  const handleSelect = (character)=>{
    dispatch(selectCharacter(character))
  }

  const handleDetails = (character) => {
    navigate('/details', {state: { character }})
  }

    return (
      <div className={styles.charWrapper}>
        <h1>My Characters</h1>
        <div className={styles.grid}>
          {characters.map((character, index) => (
            <Card
              key={character.id}
              character={{ ...character, index }} 
              showBlacklist={false} 
              onDelete={handleDelete}
              onSelect={()=> handleSelect(character)}
              onDetails={()=>handleDetails(character)} 
            />
          ))}
        </div>
      </div>
    );
}