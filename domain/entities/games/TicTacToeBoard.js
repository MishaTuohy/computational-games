import errorHandler from '@/helpers/errorHandler';

export class TicTacToeBoard {
    constructor() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.winner = null;
        this.draw = false;
        this.playerOne = null;
        this.playerTwo = null;
        this.maxParticipants = 2;
        this._turn = null;
    }

    get turn() {
        return this._turn;
    }

    set turn(value) {
        this._turn = value;
    }

    mark(position) {
        if (this.winner || this.draw) {
            errorHandler(new Error('Game has been ended!'), 'TicTacToeBoard.mark');
            return;
        }
    
        const mark = this.turn === this.playerOne ? 'x' : 'o';

        if (!this.board[position - 1]) {
            this.board = [...this.board.slice(0, position - 1), mark, ...this.board.slice(position)];
        } else {
            return;
        }
    
        if (!this.board.includes(0)) {
            this.draw = true;
        }
    
        this.checkWinner();
    
        this.turn =
            this.turn === this.playerOne
                ? (this.turn = this.playerTwo)
                : (this.turn = this.playerOne);
    
        return this.board;
    }
  
    checkWinner() {
        const winner_states = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];
    
        for (let e of winner_states) {
            const condition = e;
            const { board } = this;
            const a = board[condition[0]];
            const b = board[condition[1]];
            const c = board[condition[2]];
            if (a && b && c) {
                if (a === b && b === c) {
                    this.winner = this.turn;
                }
            }
        }
    }

    toString() {
        return JSON.stringify({
            board: this.board,
            winner: this.winner,
            draw: this.draw,
            playerOne: this.playerOne,
            playerTwo: this.playerTwo,
            turn: this.turn
        });
    }
}
