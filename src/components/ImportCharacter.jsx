import styles from './ImportCharacter.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCharacter } from '../store/characterSlice';
import { useNavigate } from 'react-router-dom';




export default function ImportCharacter(){
    
    const [name, setName] = useState('')
    const [region, setRegion] = useState('eu')
    const [server, setServer] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchThumbnailUrl = async (name, region, server) => {
      const response = await fetch(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${server}&name=${name}`);
      if (!response.ok) {
          throw new Error("Character doesn't exist");
      }
      const data = await response.json();
      return data.thumbnail_url;
    }
    const capitalizeFirstLetter = (str) => {
      if(!str) return str;
      return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase()
    }
    const handleSubmit = async (e) =>{
      e.preventDefault()
      setError('')
      console.log('click')
      if(!name || !server){
        alert("Character name and server are required!")
        return
      }
      try{
      const thumbnailUrl = await fetchThumbnailUrl(name, region, server);
      const capitalizedName = capitalizeFirstLetter(name)
      const capitalizedServer = capitalizeFirstLetter(server)
      dispatch(addCharacter({ name: capitalizedName, region, server: capitalizedServer, thumbnail: thumbnailUrl }))
      
      setName('')
      setServer('')
      setRegion('eu')
      
      navigate('/')
    } catch(error){
      setError("Character doesn't exist")
    }
    }

    return <>
       
    <div className={styles['char-form']}>
   
      <h2>Add Character</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Character Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          maxLength={12}
        />
        
        <select id="region" name="region" value={region} onChange={(e)=> setRegion(e.target.value)}>
            <option value="eu">EU</option>
            <option value="us">US</option>
        </select>

        <input 
            type="text"
            name="server"
            id="server"
            placeholder="Server"
            value={server}
            onChange={(e)=> setServer(e.target.value)}
            maxLength={20}
            /> 
             {
              error &&  <div className={styles.error}>
              {error}
            </div>
            }                     
        <button type="submit">Import Character</button>
      </form>
      
    </div>
    </>
}