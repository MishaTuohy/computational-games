import styles from '@/styles/games/Game.module.css';

export default function GameContainer({ page }) {
    return (
        <div id="map-container" className={styles.gameContainer} data-testid="map-container">
            {page}
        </div>
    );
}
