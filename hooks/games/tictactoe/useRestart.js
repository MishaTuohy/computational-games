import { useCallback } from 'react';
import { updateGameState } from '@/services/games/GameService';
import errorHandler from '@/helpers/errorHandler';

export function useRestart(gameID, gameState, setGameState) {
    const restart = useCallback(async () => {
        setGameState({
            ...gameState,
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            winner: null,
            draw: false,
        });

        try {
            await updateGameState(gameID, {
                ...gameState,
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                winner: null,
                draw: false,
            });
        } catch (error) {
            errorHandler(error, 'restart');
        }
    }, [gameState]);

    return { restart };
}