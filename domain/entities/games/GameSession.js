export class GameSession {
    constructor(gameName, game, maxParticipants) {
        this.gameName = gameName;
        this.gameState = game;
        this.maxParticipants = maxParticipants;
        this.participants = [];
        this.finished = false;
        this.timeCreated = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    toString() {
        return JSON.stringify({
            gameName: this.gameName,
            gameState: this.gameState,
            participants: this.participants,
            maxParticipants: this.maxParticipants,
            fininshed: this.fininshed,
            timeCreated: this.timeCreated,
            updatedAt: this.updatedAt
        });
    }
}