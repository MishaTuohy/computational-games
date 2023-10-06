import { useEffect } from 'react';
import produce from 'immer';
import { updateGameState } from '@/services/games/GameService';
import errorHandler from '@/helpers/errorHandler';
import useDebounce from '@/hooks/useDebounce';

export default function useUpdatePlayerState(gameID, playerState, setGameState) {
    const debouncedPlayerState = useDebounce(playerState, 150);
    useEffect(() => {
        if (debouncedPlayerState) {
            setGameState((prevGameState) =>
                produce(prevGameState, (draftGameState) => {
                    const playerIndex = draftGameState.players.findIndex((p) => p.id === debouncedPlayerState.id);
                    if (playerIndex !== -1 && JSON.stringify(draftGameState.players[playerIndex]) !== JSON.stringify(debouncedPlayerState)) {
                        draftGameState.players[playerIndex] = debouncedPlayerState;
                        try {
                            updateGameState(gameID, draftGameState);
                        } catch (error) {
                            errorHandler(error, 'debouncedPlayerState');
                        }
                    }
                })
            );
        }
    }, [debouncedPlayerState, gameID]);
}
