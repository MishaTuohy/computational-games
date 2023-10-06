import { useEffect, useCallback } from 'react';
import produce from 'immer';
import { useGenericInitialiseGame } from '../useGenericInitialiseGame';

export function useInitialiseGame(gameState, gameSession, gameID, setGameState, user) {
    const { initialise, isInitialised } = useGenericInitialiseGame();
    
    const initialiseGame = useCallback(async () => {
        if (gameState) {
            if (gameSession && gameSession.participants && gameSession.participants.length > 0) {
                const participants = gameSession.participants;
                const updatedGameState = produce(gameState, draft => {
                    if (!gameState.playerOne) {
                        draft.playerOne = participants.find((p) => p !== gameState.playerTwo) || null;
                        draft.turn = participants[0];
                    } else if (!gameState.playerTwo) {
                        draft.playerTwo = participants.find((p) => p !== gameState.playerOne) || null;
                        if (!draft.turn) {
                            draft.turn = draft.playerTwo;
                        }
                    }
                });

                if (JSON.stringify(updatedGameState) !== JSON.stringify(gameState)) {
                    setGameState(updatedGameState);
                    initialise(gameID, updatedGameState);
                }
            }
        }
    }, [gameState, gameID]);

    useEffect(() => {
        if (gameState && user && !isInitialised) {
            initialiseGame();
        }
    }, [gameState, user?.uid, !isInitialised]);

    return { initialiseGame };
}
