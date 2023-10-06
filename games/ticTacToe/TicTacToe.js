import { useAuth } from '@/services/firebase/auth/AuthProvider';
import styles from '@/styles/games/TicTacToe.module.css';
import InviteModal from '@/components/modals/InviteModal';
import PlayerScore from '@/components/games/tictactoe/PlayerScore';
import { useBehaviour } from './hooks/useBehaviour';
import { memo } from 'react';

export const TicTacToe = memo(({ gameID }) => {
    const { user, logOut } = useAuth();
    const { gameSession, gameState, wins, mark, restart, exitGame } = useBehaviour(gameID, user, logOut);

    return (
        <div className={styles.mapContainer}>
            {gameSession ? (
                <div className={styles.winner}>

                    {gameState.winner && (
                        <h3>
                            {gameState.winner === user?.uid ? 'You won!' : 'You lost!'}
                        </h3>
                    )}

                    {gameState.draw && <h3>Its a draw!</h3>}
                </div>
            ) : null}
            <PlayerScore wins={wins} state={gameState} id={user?.uid}/>
            <div className={styles.game}>
                <div className={styles.game_board} data-testid="game-board">
                    {gameState?.board.map((e, index) => (
                        <div
                            key={index}
                            className={styles.square}
                            onClick={() => mark(index + 1)}
                            data-testid="square"
                        >
                            {e === 0 ? '' : e}
                        </div>
                    ))}
                </div>
            </div>
            
            <button onClick={exitGame} className={styles.leaveButton}>Leave</button>
            {gameState?.winner || gameState?.draw ? (
                <button onClick={restart} className={styles.restartButton}>Restart</button>
            ) : null}
            <InviteModal text={'Invite'} style={styles.inviteButton} gameID={gameID}></InviteModal>
        </div>
    );
});
