import useGameUpdate from '@/hooks/useGameUpdate';
import useListenToDoc from '@/hooks/useListenToDoc';
import { render, waitFor } from '@testing-library/react';

jest.mock('firebase/auth', () => ({ getAuth: jest.fn(), }));
jest.mock('@/hooks/useListenToDoc');

function TestComponent({ gameID }) {
    const { gameSession, gameState } = useGameUpdate(gameID);
    return (
        <div>
            <div data-testid="game-session">{JSON.stringify(gameSession)}</div>
            <div data-testid="game-state">{JSON.stringify(gameState)}</div>
        </div>
    );
}

describe('useGameUpdate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
  
    it('should set gameSession and gameState when stateListener changes', async () => {
        const stateListener = { gameState: { score: 10 } };
        useListenToDoc.mockReturnValue(stateListener);
    
        const gameID = 'game-123';
        const { getByTestId } = render(<TestComponent gameID={gameID} />);
    
        await waitFor(() => expect(useListenToDoc).toHaveBeenCalledWith('gameSessions', gameID));
    
        const gameSessionNode = getByTestId('game-session');
        const gameStateNode = getByTestId('game-state');
    
        expect(gameSessionNode.textContent).toBe(JSON.stringify(stateListener));
        expect(gameStateNode.textContent).toBe(JSON.stringify(stateListener.gameState));
    });
});
