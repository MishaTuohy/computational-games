import { useEffect } from 'react';
import { isSolid, getScaleFactor } from '@/utils/coincollector/MapUtils';
import produce from 'immer';
import errorHandler from '@/helpers/errorHandler';
import { updateGameState } from '@/services/games/GameService';
import KeyPressListener from '@/utils/listeners/KeyPressListener';
import ScreenTouchListener from '@/utils/listeners/ScreenTouchListener';

export default function usePlayerMovement(gameID, gameState, setGameState, playerState, setPlayerState) {
    
    useEffect(() => {
        if (playerState) {
            const keyListeners = [
                new KeyPressListener('ArrowUp', () => handleArrowPress(playerState, 0, -1)),
                new KeyPressListener('ArrowDown', () => handleArrowPress(playerState, 0, 1)),
                new KeyPressListener('ArrowLeft', () => handleArrowPress(playerState, -1, 0)),
                new KeyPressListener('ArrowRight', () => handleArrowPress(playerState, 1, 0)),
            ];
            
            const inputListeners = [
                new ScreenTouchListener(document, (x, y) => handleTouchInput(playerState, x, y)),
                new ScreenTouchListener(document, (x, y) => handleTouchInput(playerState, x, y), false),
            ];

            return () => {
                keyListeners.forEach((listener) => listener.unbind());
                inputListeners.forEach((listener) => listener.unbind());
            };
        }
    }, [playerState]);

    useEffect(() => {
        if (playerState && gameState) {
            const coinIndex = gameState?.coins?.findIndex(
                (coin) => coin.x === playerState.x && coin.y === playerState.y
            );
    
            if (coinIndex !== -1) {
                setPlayerState((prevPlayerState) =>
                    produce(prevPlayerState, (draftPlayer) => {
                        draftPlayer.coins += 1;
                    })
                );
    
                setGameState((prevGameState) =>
                    produce(prevGameState, (draftGameState) => {
                        draftGameState.coins.splice(coinIndex, 1);
                    })
                );
    
                try {
                    const updatedGameState = produce(gameState, (draftGameState) => {
                        draftGameState.coins.splice(coinIndex, 1);
                    });
                    updateGameState(gameID, updatedGameState);
                } catch (error) {
                    errorHandler(error, 'handleCoinPickUp');
                }
            }
        }
    }, [playerState, gameState]);

    function handleTouchInput(player, touchX, touchY) {
        const scaleFactor = getScaleFactor();
        const mapElement = document.getElementById('map');
        const rect = mapElement.getBoundingClientRect();
        const mapX = (touchX - rect.left) / scaleFactor;
        const mapY = (touchY - rect.top) / scaleFactor;
        const playerScreenX = player.x * 16;
        const playerScreenY = player.y * 16;
    
        const deltaX = mapX - playerScreenX;
        const deltaY = mapY - playerScreenY;
    
        let xChange = 0;
        let yChange = 0;
    
        if (mapElement.contains(document.elementFromPoint(touchX, touchY))) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                xChange = deltaX > 0 ? 1 : -1;
            } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
                yChange = deltaY > 0 ? 1 : -1;
            } else {
                // Diagonal movement
                xChange = deltaX > 0 ? 1 : -1;
                yChange = deltaY > 0 ? 1 : -1;
            }
        }
    
        handleArrowPress(player, xChange, yChange);
    }

    function handleArrowPress(player, xChange = 0, yChange = 0) {
        const newX = player.x + xChange;
        const newY = player.y + yChange;

        if (!isSolid(newX, newY)) {
            setPlayerState((prevState) => {
                const updatedPlayer = produce(prevState, (draftPlayer) => {
                    draftPlayer.x = newX;
                    draftPlayer.y = newY;
                    draftPlayer.direction =
                        xChange === 1 ? 'right' : xChange === -1 ? 'left' : draftPlayer.direction;
                });
                return updatedPlayer;
            });
        }
    }
}
