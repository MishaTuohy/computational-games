import useGameUpdate from '@/hooks/useGameUpdate';
import { useExit } from './useExit';
import { useInitialiseGame } from './useInitialiseGame';
import { useMark } from './useMark';
import { useRestart } from './useRestart';
import { useUpdateWins } from './useUpdateWins';

export function useBehaviour(gameID, user, logOut) {
    const { gameSession, gameState, setGameState } = useGameUpdate(gameID);
    const { wins, setWins } = useUpdateWins(gameState, user, gameState, setGameState);
    const { mark } = useMark(gameID, gameState, setGameState, user);
    const { restart } = useRestart(gameID, gameState, setGameState);
    const { exitGame } = useExit(gameID, gameState, setGameState, user, logOut, setWins);
    useInitialiseGame(gameState, gameSession, gameID, setGameState, user);

    return {
        gameSession,
        gameState,
        wins,
        mark,
        restart,
        exitGame
    };
}
