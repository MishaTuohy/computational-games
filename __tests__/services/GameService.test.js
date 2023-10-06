import { getGame, updateParticipants, updateGameState, initialiseGame, joinGame, deleteGame, removeParticipant } from '@/services/games/GameService';
import { GameSession } from '@/domain/entities/games/GameSession';
import { createDoc, deleteDoc, getDoc, updateDoc } from '@/services/api/ApiService';

jest.mock('@/services/api/ApiService', () => ({
    createDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

describe('GameService' , () => {
    beforeEach(() => {
        createDoc.mockClear();
        deleteDoc.mockClear();
        getDoc.mockClear();
        updateDoc.mockClear();
    });

    describe('getGame', () => {
        it('should call getDoc with the correct arguments', async () => {
            const id = 'game123';
            await getGame(id);
            expect(getDoc).toHaveBeenCalledWith('gameSessions', id);
        });
    });

    describe('updateParticipants', () => {
        const id = 'game123';
        const updatedParticipants = ['user1', 'user2'];

        it('should call updateDoc with the correct arguments', async () => {
            await updateParticipants(id, updatedParticipants);
            expect(updateDoc).toHaveBeenCalledWith('gameSessions', id, {
                updatedAt: expect.any(String),
                participants: updatedParticipants,
            });
        });

        it('should throw an error if id or participants are missing', async () => {
            await expect(updateParticipants()).rejects.toThrow();
            await expect(updateParticipants(id, null)).rejects.toThrow();
            await expect(updateParticipants(null, updatedParticipants)).rejects.toThrow();
        });
    });

    describe('updateGameState', () => {
        const id = 'game123';
        const gameState = { player1: 'X', player2: 'O' };

        it('should call updateDoc with the correct arguments', async () => {
            await updateGameState(id, gameState);
            expect(updateDoc).toHaveBeenCalledWith('gameSessions', id, {
                updatedAt: expect.any(String),
                gameState,
            });
        });

        it('should throw an error if id or gameState are missing', async () => {
            await expect(updateGameState()).rejects.toThrow();
            await expect(updateGameState(id, null)).rejects.toThrow();
            await expect(updateGameState(null, gameState)).rejects.toThrow();
        });
    });

    describe('initialiseGame', () => {
        it('should create a new game session', async () => {
            const mockCreateDoc = createDoc.mockResolvedValue({ id: 'game123' });
            const result = await initialiseGame('tictactoe');
            expect(mockCreateDoc).toHaveBeenCalledWith('gameSessions', expect.any(GameSession));
            expect(result).toBe('game123');
        });
  
        it('should return null if an error occurs', async () => {
            const mockCreateDoc = createDoc.mockRejectedValue(new Error('Database connection failed'));
            const result = await initialiseGame('tictactoe');
            expect(mockCreateDoc).toHaveBeenCalledWith('gameSessions', expect.any(GameSession));
            expect(result).toBeNull();
        });

        it('should throw an error if gameName is missing', async () => {
            await expect(updateGameState()).rejects.toThrow();
        });
    });

    describe('joinGame', () => {
        const id = 'game123';
        const userID = 'user1';
        const maxParticipants = 3;

        it('should return true if the user has already joined the game', async () => {
            const participants = ['user1', 'user2'];
            getDoc.mockResolvedValue({ participants, maxParticipants });
            const result = await joinGame(id, userID);
            expect(getDoc).toHaveBeenCalledWith('gameSessions', id);
            expect(result).toBe(true);
        });

        it('should add a new participant if there\'s room in the game', async () => {
            const participants = ['user1'];
            getDoc.mockResolvedValue({ participants, maxParticipants });
            const updatedParticipants = ['user1', 'user2'];
            updateDoc.mockResolvedValue();
            const result = await joinGame(id, 'user2');
            expect(getDoc).toHaveBeenCalledWith('gameSessions', id);
            expect(updateDoc).toHaveBeenCalledWith('gameSessions', id, {
                updatedAt: expect.any(String),
                participants: updatedParticipants,
            });
            expect(result).toBe(true);
        });

        it('should return false if the game is already full', async () => {
            const participants = ['user1', 'user2', 'user3'];
            getDoc.mockResolvedValue({ participants, maxParticipants });
            const result = await joinGame(id, 'user4');
            expect(getDoc).toHaveBeenCalledWith('gameSessions', id);
            expect(updateDoc).not.toHaveBeenCalled();
            expect(result).toBe(false);
        });
    });

    describe('deleteGame', () => {
        const id = 'game123';
  
        it('should call deleteDoc with the correct arguments', async () => {
            deleteDoc.mockResolvedValue();
            await deleteGame(id);
            expect(deleteDoc).toHaveBeenCalledWith('gameSessions', id);
        });
  
        it('should log an error if an error occurs', async () => {
            const mockError = new Error('Database connection failed');
            deleteDoc.mockRejectedValue(mockError);
            console.error = jest.fn();
            await deleteGame(id);
            expect(deleteDoc).toHaveBeenCalledWith('gameSessions', id);
            expect(console.error).toHaveBeenCalledWith(mockError);
        });
    });

    describe('removeParticipant', () => {
        const id = 'game123';
        const userID = 'user1';

        it('should delete the game session if the participant is the only one in the game', async () => {
            const participants = ['user1'];
            const mockGetGame = getDoc.mockResolvedValue({ participants });
            const mockDeleteGame = deleteDoc.mockResolvedValue();
            await removeParticipant(userID, id);
            expect(mockGetGame).toHaveBeenCalledWith('gameSessions', id);
            expect(mockDeleteGame).toHaveBeenCalledWith('gameSessions', id);
        });

        it('should delete the game session if the last participant leaves', async () => {
            const id = 'game123';
            const userID = 'user1';
            const mockGetGame = getDoc.mockResolvedValue({
                participants: ['user1'],
            });
            const mockDeleteGame = deleteDoc.mockResolvedValue();
            await removeParticipant(userID, id);
            expect(mockGetGame).toHaveBeenCalledWith('gameSessions', id);
            expect(mockDeleteGame).toHaveBeenCalledWith('gameSessions', id);
        });
    });
});
