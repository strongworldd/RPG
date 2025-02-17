import Character from "./Character.ts";

export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer: Character[], private enemies: Character[]) {
        this.fighters = this.determineTurnOrder();
    }

    private determineTurnOrder(): Character[] {
        const participants: Character[] = [...this.adventurer, ...this.enemies];
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

    private isTeamDefeated(team: Character[]): boolean {
        for (let character of team) {
            if (character.isAlive()) {
                return false; 
            }
        }
        return true; 
    }

    public start(): void {
        console.log("⚔️ Le combat commence !");
        for (;;) { 
            this.takeTurn();
    
            if (this.isTeamDefeated(this.adventurer) || this.isTeamDefeated(this.enemies)) {
                break; 
            }
        }
        this.endFight();
    }
}