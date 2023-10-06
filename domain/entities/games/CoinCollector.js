export class CoinCollector {
    constructor() {
        this.players = [];
        this.coins = [];
        this.maxParticipants = 5;
        this.coinSpawner = null;
    }

    toString() {
        return JSON.stringify({
            players: this.players,
        });
    }
}
