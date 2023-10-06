import useListenToDoc from '@/hooks/services/firebase/useListenToDoc';
import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

export default function useGameUpdate(gameID) {
    const [gameSession, setGameSession] = useState(null);
    const [gameState, setGameState] = useState(null);
    const stateListener = useListenToDoc('gameSessions', gameID);
  
    useEffect(() => {
        if (!isEqual(stateListener, gameSession)) {
            setGameSession(stateListener);
            if (!isEqual(stateListener?.gameState, gameState)) {
                setGameState(stateListener?.gameState);
            }
        }
    }, [stateListener]);
  
    return { gameSession, gameState, setGameSession, setGameState };
}
