import { useState } from 'react';
import useGameUpdate from '../useGameUpdate';
import useChangeColor from './useChangeColor';
import useChangeName from './useChangeName';
import useCoinSpawner from './useCoinSpawner';
import useExit from './useExit';
import useInitialiseGame from './useInitialiseGame';
import usePlayerMovement from './usePlayerMovement';
import useUpdatePlayerState from './useUpdatePlayerState';

export default function useBehaviour(gameID, user, logOut) {
    const [playerState, setPlayerState] = useState(null);
    const { gameState, setGameState } = useGameUpdate(gameID);
    useInitialiseGame(gameID, user, gameState, setGameState, setPlayerState);
    useCoinSpawner(gameID, user, gameState, setGameState);
    usePlayerMovement(gameID, gameState, setGameState, playerState, setPlayerState);
    const changeName = useChangeName(gameID, user, gameState, setGameState, playerState, setPlayerState);
    const changeColor = useChangeColor(gameID, user, gameState, setGameState, playerState, setPlayerState);
    useUpdatePlayerState(gameID, playerState, setGameState);
    const { exitGame } = useExit(gameID, user, gameState, logOut);

    return {
        playerState,
        gameState,
        changeName,
        changeColor,
        exitGame
    };
}
