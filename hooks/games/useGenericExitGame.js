import { useCallback } from 'react';
import { useRouter } from 'next/router';
import errorHandler from '@/helpers/errorHandler';

export default function useGenericExitGame(gameID, user, updateGame, logOut) {
    const router = useRouter();

    const exitGame = useCallback(async () => {
        router.push('/');

        try {
            const exists = await updateGame(gameID, user?.uid);
            if (exists) {
                await logOut();
            }
        } catch (error) {
            errorHandler(error, 'exitGame');
        }
    }, [router, gameID, user?.uid, updateGame, logOut]);

    return { exitGame };
}
