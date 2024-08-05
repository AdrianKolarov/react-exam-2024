import styles from './Search.module.css'
import PropTypes from "prop-types";

export default function Search({ searchQuery, onSearchChange }){
    return <>
        <div className={styles.searchBar}>
            <input
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
            value={searchQuery}
            onChange={onSearchChange}
            />
            
        </div>
    </>
}

Search.propTypes = {
    searchQuery: PropTypes.string.isRequired, 
    onSearchChange: PropTypes.func.isRequired,
};