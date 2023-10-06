import { useCallback } from 'react';
import { updateGameState, removeParticipant } from '@/services/games/GameService';
import produce from 'immer';
import useGenericExitGame from '../useGenericExitGame';

export function useExit(gameID, gameState, setGameState, user, logOut, setWins) {

    const updateGame = useCallback(async (gameID, playerId) => {
        const resetGameObj = produce(gameState, draftState => {
            draftState.draw = false;
            draftState.winner = null;
            draftState.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

            const { playerOne, playerTwo, turn } = draftState;

            if (playerOne === playerId) {
                if (turn === playerOne) {
                    draftState.turn = playerTwo;
                }
                delete draftState.playerOne;
            } else if (playerTwo === playerId) {
                if (turn === playerTwo) {
                    draftState.turn = playerOne;
                }
                delete draftState.playerTwo;
            }
        });

        const exists = await removeParticipant(playerId, gameID);
        if (exists) {
            setWins({ me: 0, other: 0 });
            setGameState(resetGameObj);
            await updateGameState(gameID, resetGameObj);
        }

        return exists;
    }, [gameState]);

    const { exitGame } = useGenericExitGame(gameID, user, updateGame, logOut);

    return { exitGame };
}
