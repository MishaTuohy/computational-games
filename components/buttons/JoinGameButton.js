import { getGame } from '@/services/games/GameService';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import errorHandler from '@/helpers/errorHandler';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

export default function JoinGameButton({ game }) {
    const router = useRouter();
    const { logIn } = useAuth();
  
    const onJoinRoomClick = async () => {
        try {
            let id = prompt('Please enter your invite code') || '';
            if (id.trim() === '') return;
            const check = await getGame(id);
    
            if (check) {
                await logIn();
                router.push({
                    pathname: `/${game}/${id}`,
                });
            } else {
                errorHandler(new Error('No such game! Please enter a valid game code'), 'onJoinRoomClick');
            }
        } catch (error) {
            errorHandler(error, 'onJoinRoomClick');
        }
    };
  
    return (
        <Button onClick={onJoinRoomClick} data-testid="join-game-button">
            JoinGame
        </Button>
    );
}
