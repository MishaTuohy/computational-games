import { useCallback } from 'react';
import errorHandler from '@/helpers/errorHandler';
import produce from 'immer';
import { updateGameState } from '@/services/games/GameService';
import { createName } from '@/utils/coincollector/PlayerUtils';

export default function useChangeName(gameID, user, gameState, setGameState, playerState, setPlayerState) {
    const changeName = useCallback(() => {
        const playerId = user?.uid;
        const newName = createName(playerState.name);

        setPlayerState((prevState) => ({ ...prevState, name: newName }));
        setGameState((prevGameState) =>
            produce(prevGameState, (draftGameState) => {
                const playerIndex = draftGameState.players.findIndex((p) => p.id === playerId);
                if (playerIndex !== -1) {
                    draftGameState.players[playerIndex].name = newName;
                    try {
                        updateGameState(gameID, draftGameState);
                    } catch (error) {
                        errorHandler(error, 'changeName');
                    }
                }
            })
        );
    }, [gameState, user?.uid]);

    return changeName;
}
