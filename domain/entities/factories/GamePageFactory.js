import errorHandler from '@/helpers/errorHandler';
import { CoinCollector } from '@/games/CoinCollector';
import { TicTacToe } from '@/games/TicTacToe';

export function createGamePage(type, id) {
    if(!type || !id) {
        errorHandler(new Error('type and id must not be null'), 'createGamePage');
        return null;
    }
    switch (type.toLowerCase()) {
    case 'tictactoe':
        return (<TicTacToe gameID={id}/>);
    case 'coincollector':
        return (<CoinCollector gameID={id}/>);
    default:
        errorHandler(new Error(`Invalid game type: ${type}`), 'createGamePage');
        return null;
    }
}
