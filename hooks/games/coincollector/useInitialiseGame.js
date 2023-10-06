import { useCallback, useEffect } from 'react';
import { useGenericInitialiseGame } from '../useGenericInitialiseGame';
import { getRandomSafeSpot } from '@/utils/coincollector/MapUtils';
import { createName, playerColors, randomFromArray } from '@/utils/coincollector/PlayerUtils';
import produce from 'immer';

export default function useInitialiseGameTwo(gameID, user, gameState, setGameState, setPlayerState) {
    const { initialise, isInitialised } = useGenericInitialiseGame(gameID, gameState);

    const initialiseGame = useCallback(() => {
        if (gameState && user) {
            const existingPlayer = gameState.players.find(player => player.id === user?.uid);
            if (!existingPlayer) {
                const startingPostion = getRandomSafeSpot();
                const newPlayer = {
                    id: user?.uid,
                    name: createName(),
                    direction: 'right',
                    color: randomFromArray(playerColors),
                    x: startingPostion.x,
                    y: startingPostion.y,
                    coins: 0,
                };
        
                const updatedGameState = produce(gameState, draft => {
                    draft.players.push(newPlayer);

                    if (gameState.players.length === 0) {
                        draft.coinSpawner = user?.uid;
                    }
                });
        
                setPlayerState(newPlayer);
                setGameState(updatedGameState);
                initialise(gameID, updatedGameState);
            }
        }
    }, [gameState, user, setGameState, setPlayerState, initialise, gameID]);

    useEffect(() => {
        if (gameState && user && !isInitialised) {
            initialiseGame();
        }
    }, [gameState, user?.uid, isInitialised, initialiseGame]);

    return {
        initialiseGame,
    };
}
