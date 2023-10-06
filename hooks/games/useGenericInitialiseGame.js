import { updateGameState } from '@/services/games/GameService';
import { useState, useCallback } from 'react';

export function useGenericInitialiseGame() {
    const [isInitialised, setIsInitialised] = useState(false);

    const initialise = useCallback(async (gameID, updatedGameState) => {
        if (!isInitialised) {
            if (updatedGameState) {
                setIsInitialised(true);
                await updateGameState(gameID, updatedGameState);
                return true;
            }
        }
    }, [isInitialised]);

    return { initialise, isInitialised };
}
