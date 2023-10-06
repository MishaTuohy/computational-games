import { useState, useEffect } from 'react';
import produce from 'immer';

export function useUpdateWins(gameState, user) {
    const [wins, setWins] = useState({ me: 0, other: 0 });

    useEffect(() => {
        if (gameState?.winner) {
            if (gameState.winner === user?.uid) {
                setWins(
                    produce(wins, (draftWins) => {
                        draftWins.me += 1;
                    })
                );
            } else {
                setWins(
                    produce(wins, (draftWins) => {
                        draftWins.other += 1;
                    })
                );
            }
        }
    }, [gameState?.winner, user?.uid]);

    return { wins, setWins };
}
