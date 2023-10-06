import { createGame } from '@/domain/entities/factories/GameFactory';
import { createDoc, deleteDoc, getDoc, updateDoc } from '../api/ApiService';
import errorHandler from '@/helpers/errorHandler';

export async function getGame(id) {
    try {
        return await getDoc('gameSessions', id);
    } catch (error) {
        errorHandler(error, 'getGame');
    }
}

export async function updateParticipants(id, updatedParticipants) {
    if (!id || !updatedParticipants) {
        throw new Error('id and participants are required');
    }
    try {
        await updateDoc('gameSessions', id, {
            updatedAt: new Date().toISOString(),
            participants: updatedParticipants,
        });
    } catch (error) {
        errorHandler(error, 'updateParticipants');
    }
}

export async function updateGameState(id, game_state) {
    if(!id || !game_state) {
        throw new Error('id and gameState are required');
    }
    try {
        await updateDoc('gameSessions', id, {
            updatedAt: new Date().toISOString(),
            gameState: game_state,
        });
    } catch (error) {
        errorHandler(error, 'updateGameState');
    }
}

export async function initialiseGame(gameName) {
    if(!gameName) {
        throw new Error('gameName is required');
    }
    const body = createGame(gameName);

    try {
        const res = await createDoc('gameSessions', body);
        return res.id;
    } catch (error) {
        errorHandler(error, 'initialiseGame');
        return null;
    }
}

export async function joinGame(id, userID) {
    const res = await getGame(id);
    if (!res) {
        console.error('Game not found');
        return false;
    }
    if (res.participants.includes(userID)) {
        return true;
    }
    if (res.participants.length < res.maxParticipants) {
        res.participants.push(userID);
        await updateParticipants(id, res.participants).catch((error) => {
            errorHandler(error, 'joinGame');
        });
        return true;
    } else {
        return false;
    }
}

export async function deleteGame(id) {
    try {
        return await deleteDoc('gameSessions' ,id);
    } catch (error) {
        console.error(error);
    }
}

export async function removeParticipant(userID, id) {
    const res = await getGame(id);

    if (!res) {
        console.error('Game not found');
        return false;
    }

    const participants = res.participants;

    if (participants.length <= 1) {
        deleteGame(id);
        return false;
    }

    const updatedParticipants = participants.filter((participant) => participant !== userID);

    if (updatedParticipants.length !== participants.length) {
        await updateParticipants(id, updatedParticipants);
    }

    return true;
}
