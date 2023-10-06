import { memo } from 'react';
import styles from '@/styles/games/CoinCollector.module.css';

const CoinElement = memo(function CoinElement({ coin }) {
    const { x, y } = coin;
    return (
        <div
            className={`${styles.Coin} ${styles.grid_cell}`}
            style={{
                left: `${x * 16}px`,
                top: `${y * 16 - 4}px`,
            }}
            data-testid="coin"
        >
            <div className={`${styles.Coin_shadow} ${styles.grid_cell}`}></div>
            <div className={`${styles.Coin_sprite} ${styles.grid_cell}`}></div>
        </div>
    );
});

export default CoinElement;
