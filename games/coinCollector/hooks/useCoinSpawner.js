import { useCallback, useEffect } from 'react';
import { updateGameState } from '@/services/games/GameService';
import errorHandler from '@/helpers/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';
import { getRandomSafeSpot } from '@/utils/coincollector/MapUtils';

export default function useCoinSpawner(gameID, user, gameState, setGameState) {
    const addCoin = useCallback(() => {
        const findUniquePosition = () => {
            let uniquePosition = false;
            let newCoinPosition = null;
    
            while (!uniquePosition) {
                newCoinPosition = getRandomSafeSpot();
                const existingCoin = gameState?.coins.find(
                    (coin) => coin.x === newCoinPosition.x && coin.y === newCoinPosition.y
                );
    
                if (!existingCoin) {
                    uniquePosition = true;
                }
            }
    
            return newCoinPosition;
        };
    
        const newCoinPosition = findUniquePosition();
        const newCoin = {id: uuidv4(), x: newCoinPosition.x, y: newCoinPosition.y };
    
        setGameState((prevGameState) =>
            produce(prevGameState, (draftGameState) => {
                draftGameState.coins.push(newCoin);
    
                try {
                    updateGameState(gameID, draftGameState);
                } catch (error) {
                    errorHandler(error, 'addCoin');
                }
            })
        );
    }, [gameID]);

    useEffect(() => {
        if (user?.uid === gameState?.coinSpawner && gameState?.coins && gameState.coins?.length < 5) {
            const coinSpawnInterval = setInterval(() => {
                addCoin();
            }, 3000);

            return () => {
                clearInterval(coinSpawnInterval);
            };
        }
    }, [gameState, user?.uid]);
}
