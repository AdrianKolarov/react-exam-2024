
import styles from './ImportCharacter.module.css';
export default function ImportCharacter(){
    return <>
    
   
    <div className={styles['char-form']}>
   
      <h2>Add Character</h2>
      <form className="create-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Character Name"
        />
        
        <select id="region" name="region">
            <option value="eu">EU</option>
            <option value="us">US</option>
        </select>

        <input 
            type="text"
            name="server"
            id="server"
            placeholder="Server"
            />                      
        <button type="submit">Import Character</button>
      </form>
      
    </div>
    </>
}