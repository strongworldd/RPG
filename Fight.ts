import { Character } from "./Character";

export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer: Character[], private ennemis: Character[]) {
        this.fighters = this.determineTurnOrder();
    }

    private determineTurnOrder(): Character[] {
        const participants: Character[] = [...this.adventurer, ...this.ennemis];
        participants.sort((a, b) => {
            if (b.speed > a.speed) {
                return 1; 
            } else if (b.speed < a.speed) {
                return -1; 
            } else {
                return 0; 
            }
        });
        return participants;
    }
}