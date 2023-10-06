import { useCallback } from 'react';
import { removeParticipant, updateGameState } from '@/services/games/GameService';
import useGenericExitGame from '@/hooks/useGenericExitGame';

export default function useExit(gameID, user, gameState, logOut) {
    const updateGame = useCallback(async (gameID, playerId) => {
        const exists = await removeParticipant(playerId, gameID);

        if (exists) {
            const updatedPlayers = gameState?.players.filter(player => player.id !== playerId);
            const gameObj = { ...gameState, players: updatedPlayers };
            await updateGameState(gameID, gameObj);
        }

        return exists;
    }, [gameState]);

    const { exitGame } = useGenericExitGame(gameID, user, updateGame, logOut);

    return { exitGame };
}
