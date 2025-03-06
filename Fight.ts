import Character from "./classCharacters/Character.ts";

export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer :Character[], private enemies :Character[]) {
        this.fighters = this.determineTurnOrder();
    }

    private determineTurnOrder = () : Character[] => {
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

    private isTeamDefeated = (team :Character[]) : boolean => {
        for (const character of team) {
            if (character.isAlive()) {
                return false;
            }
        }
        return true; 
    }

    private start = () : void => {
        console.log("⚔️ Le combat commence !");
        do { 
            this.takeTurn();
    
        } while (this.isTeamDefeated(this.adventurer) || this.isTeamDefeated(this.enemies));

        this.endFight();
    }

    private takeTurn = () : void => {
        const currentFighter = this.fighters[this.currentTurnIndex];
    
        if (!currentFighter.isAlive()) {
            console.log(`❌ ${currentFighter.name} est K.O.`);
            this.nextTurn();
            return;
        }
    
        let target :Character | null = null;
        for (const enemy of this.enemies) {
            if (enemy.isAlive()) {
                target = enemy;
                break;
            }
        }
    
        if (target != null) {
            console.log(currentFighter.attack(target));
        } else {
            console.log("⚔️ Il n'y a plus d'ennemis à attaquer.");
        }
    
        this.nextTurn();
    }
    
    private nextTurn = () : void => {
        if (this.isTeamDefeated(this.fighters)) {
            console.log("💀 Tous les combattants sont K.O. ! Fin du combat.");
            return;
        }
    
        do {
            this.currentTurnIndex++;
            if (this.currentTurnIndex >= this.fighters.length) {
                this.currentTurnIndex = 0;
            }
        } while (!this.fighters[this.currentTurnIndex].isAlive());
    }

    private endFight = (): void => {
        if (this.isTeamDefeated(this.adventurer)) {
            console.log("💀 Tous les aventuriers sont K.O. ! GAME OVER.");
        } else if (this.isTeamDefeated(this.enemies)) {
            console.log("🏆 Victoire ! Les aventuriers ont triomphé du combat ! Youpiiiiiii");
        }
    }    
}