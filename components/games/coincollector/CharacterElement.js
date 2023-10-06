import { memo } from 'react';
import styles from '@/styles/games/CoinCollector.module.css';

const CharacterElement = memo(function CharacterElement({ player, playerId }) {
    return (
        <div
            className={`${styles.Character} ${styles.grid_cell} ${player.id === playerId ? styles.you : ''}`}
            style={{
                left: `${player.x * 16}px`,
                top: `${player.y * 16 - 4}px`,
            }}
            datacolor={player.color}
            datadirection={player.direction}
            data-testid="character"
        >
            <div className={`${styles.Character_shadow} ${styles.grid_cell}`}></div>
            <div className={`${styles.Character_sprite} ${styles.grid_cell}`}></div>
            <div className={`${styles.Character_name_container}`}>
                <span className={`${styles.Character_name}`}>{player.name}</span>
                <span className={`${styles.Character_coins}`}>{player.coins}</span>
            </div>
            {player.id === playerId && <div className={`${styles.Character_you_arrow}`}></div>}
        </div>
    );
});

export default CharacterElement;
