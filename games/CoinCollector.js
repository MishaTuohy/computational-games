import CharacterElement from '@/components/games/coincollector/CharacterElement';
import CoinElement from '@/components/games/coincollector/CoinElement';
import InviteModal from '@/components/modals/InviteModal';
import useBehaviour from '@/hooks/games/coincollector/useBehaviour';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import styles from '@/styles/games/CoinCollector.module.css';

export function CoinCollector({ gameID }) {
    const { user, logOut } = useAuth();
    const { playerState, gameState, changeName, changeColor, exitGame } = useBehaviour(gameID, user, logOut);

    return (
        <div id="map" className={styles.mapContainer} data-testid="map-container">
            <div className={styles.playerInfo}>
                <button id="change_name" onClick={changeName} onTouchEnd={changeName}>Change Name</button>
                <button id="player_color" onClick={changeColor} onTouchEnd={changeColor}>Change Color</button>
            </div>
            <div className={styles.map} />
            {gameState?.players?.map((player) => {
                if (player.id !== user?.uid) {
                    return (
                        <CharacterElement key={player.id} player={player} playerId={user?.uid} />
                    );
                }
            })}
            {playerState && (
                <CharacterElement key={playerState.id} player={playerState} playerId={user?.uid} />
            )}
            {gameState?.coins.map((coin) => (
                <CoinElement key={coin.id} coin={coin} />
            ))}
            <button onClick={exitGame} onTouchEnd={exitGame} className={styles.leaveButton}>Leave Game</button>
            <InviteModal text={'Invite friends'} style={styles.inviteButton} gameID={gameID}>Invite friends</InviteModal>
        </div>
    );
}
