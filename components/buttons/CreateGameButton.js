import { initialiseGame } from '@/services/games/GameService';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import errorHandler from '@/helpers/errorHandler';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

export default function CreateGameButton({ game }) {
    const router = useRouter();
    const { logIn } = useAuth();
  
    const onCreateGameClick = async () => {
        try {
            const id = await initialiseGame(game);
            await logIn();
            router.push({
                pathname: `/${game}/${id}`,
            });
        } catch (error) {
            errorHandler(error, 'onCreateGameClick');
        }
    };
  
    return (
        <Button onClick={onCreateGameClick} data-testid="create-game-button">
            CreateGame
        </Button>
    );
}
