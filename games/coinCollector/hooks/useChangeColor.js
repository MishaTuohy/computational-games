import { useCallback } from 'react';
import errorHandler from '@/helpers/errorHandler';
import produce from 'immer';
import { playerColors, randomFromArray } from '@/utils/coincollector/PlayerUtils';
import { updateGameState } from '@/services/games/GameService';

export default function useChangeColor(gameID, user, gameState, setGameState, playerState, setPlayerState) {
    const changeColor = useCallback(() => {
        const playerId = user?.uid;
        const newColor = randomFromArray(playerColors, playerState.color);

        setPlayerState((prevState) => ({ ...prevState, color: newColor }));
        setGameState((prevGameState) =>
            produce(prevGameState, (draftGameState) => {
                const playerIndex = draftGameState.players.findIndex((p) => p.id === playerId);
                if (playerIndex !== -1) {
                    draftGameState.players[playerIndex].color = newColor;
                    try {
                        updateGameState(gameID, draftGameState);
                    } catch (error) {
                        errorHandler(error, 'changeColor');
                    }
                }
            })
        );
    }, [gameState, user?.uid]);

    return changeColor;
}
