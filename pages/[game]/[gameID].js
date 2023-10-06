import { useRouter } from 'next/router';
import { createGamePage } from '@/domain/entities/factories/GamePageFactory';
import { joinGame } from '@/services/games/GameService';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import Loader from '@/components/loaders/Loader';
import GameContainer from '@/components/games/GameContainer';
import errorHandler from '@/helpers/errorHandler';
import GameLayout from '@/components/layout/GameLayout';

export default function Index() {
    const router = useRouter();
    const [gamePage, setGamePage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { logOut, logIn } = useAuth();
    const { game, gameID } = router.query;

    useEffect(() => {
        if (game && gameID) {
            (async () => {
                const user = await logIn();
                await joinGame(gameID, user?.uid)
                    .then(async (success) => {
                        if (!success) {
                            await logOut();
                            router.push('/');
                            alert('Max players reached');
                        } else {
                            setGamePage(createGamePage(game, gameID));
                        }
                    })
                    .catch(async (error) => {
                        errorHandler(error, '[gameID]');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            })();
        }
    }, [game, gameID, logIn, logOut, router]);

    return (
        <Fragment>
            {isLoading &&  <Loader /> }
            {!isLoading && gamePage && ( <GameContainer page={gamePage} /> )}
        </Fragment>
    );
}

Index.getLayout = function getLayout(page) {
    return (
        <GameLayout>
            {page}
        </GameLayout>
    );
};
