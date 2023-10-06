import { useCallback } from 'react';
import { updateGameState } from '@/services/games/GameService';
import errorHandler from '@/helpers/errorHandler';
import { createGameInstance } from '@/domain/entities/factories/GameFactory';

export function useMark(gameID, gameState, setGameState, user) {
    const mark = useCallback(async (index) => {
        if (gameState.turn !== user?.uid) {
            console.log('It is not your turn');
            return;
        }

        const { playerOne, playerTwo, board, turn, winner } = gameState;
        const game = createGameInstance('tictactoe');
        game.playerOne = playerOne;
        game.playerTwo = playerTwo;
        game.board = board;
        game.turn = turn || playerOne;
        game.winner = winner || null;
        game.mark(index);

        const data = JSON.parse(game.toString());

        setGameState(data);

        try {
            await updateGameState(gameID, data);
        } catch (error) {
            errorHandler(error, 'mark');
        }
    }, [gameState]);

    return { mark };
}