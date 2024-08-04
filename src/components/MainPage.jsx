import styles from './MainPage.module.css';
import Card from './Card';
import { Link } from 'react-router-dom';
import { selectUsers } from '../store/usersSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalBlacklist } from '../store/globalBlacklistSlice.js';
import { useEffect, useState } from 'react';



const fetchThumbnailUrl = async (name, server) => {
    try {
        const url = `https://raider.io/api/v1/characters/profile?region=eu&realm=${server}&name=${name}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.thumbnail_url;
        }
    } catch (error) {
        console.error('EU Region failed, trying US:', error);
    }

    try {
        const url = `https://raider.io/api/v1/characters/profile?region=us&realm=${server}&name=${name}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.thumbnail_url;
        }
    } catch (error) {
        console.error('US Region also failed:', error);
    }

    return null;
};

export default function MainPage() {
   
    const user = useSelector(selectUsers);
    const dispatch = useDispatch();
    const [topCharacters, setTopCharacters] = useState([]);
    const globalBlacklist = useSelector((state) => state.globalBlacklist);

    useEffect(() => {
        dispatch(fetchGlobalBlacklist());
    }, [dispatch]);
    
    
    
    useEffect(() => {
        if (globalBlacklist.length > 0) {
                const fetchCharacterData = async () => {
                const sorted = [...globalBlacklist].sort((a, b) => b.count - a.count).slice(0, 3);
                const charactersWithThumbnails = await Promise.all(
                    sorted.map(async (character, index) => {
                        const [name, server] = character.name.split('-');
                        const thumbnail = await fetchThumbnailUrl(name, server);
                        return { ...character, name, server, thumbnail, index };
                    })
                );
                setTopCharacters(charactersWithThumbnails);
            };

            fetchCharacterData();
        }
    }, [globalBlacklist]);

    return (
        <>
            <p className={styles.para}>Welcome to the website where you can blacklist everyone...</p>
            {!user.currentUser ? (
                <div className={styles.buttons}>
                    <Link to="/login" id={styles.login}>Login</Link>
                    <Link to="/register" id={styles.register}>Register</Link>
                </div>
            ) : (
                <Link to="/import" id={styles.import}>Import your character</Link>
            )}
            <div className={styles.shame}>
                <h1>Hall of Shame</h1>
                <div className={styles.cards}>
                    {topCharacters.map((character) => (
                        <Card
                            key={character.id}
                            character={character}
                            showBlacklist={true}
                            index={character.index}
                            
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
