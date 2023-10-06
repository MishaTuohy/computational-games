import errorHandler from '@/helpers/errorHandler';
import { CoinCollector } from '../games/CoinCollector';
import { TicTacToeBoard } from '../games/TicTacToeBoard';
import { GameSession } from '../games/GameSession';

export function createGame(type) {
    let game;
    if(!type) {
        errorHandler(new Error('type must not be null'), 'createGame');
        return null;
    }
    switch (type.toLowerCase()) {
    case 'tictactoe':
        game = new TicTacToeBoard();
        return new GameSession(type, game, game.maxParticipants);
    case 'coincollector':
        game = new CoinCollector();
        return new GameSession(type, game, game.maxParticipants);
    default:
        errorHandler(new Error(`Invalid game type: ${type}`), 'createGame');
        return null;
    }
}

export function createGameInstance(type) {
    if(!type) {
        errorHandler(new Error('type must not be null'), 'createGameInstance');
        return null;
    }
    switch (type.toLowerCase()) {
    case 'tictactoe':
        return new TicTacToeBoard();
    case 'coincollector':
        return new CoinCollector();
    default:
        errorHandler(new Error(`Invalid game type: ${type}`), 'createGameInstance');
        return null;
    }
}
