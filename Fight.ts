import { Character } from "./classCharacters/Character.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Menu } from "./Menu.ts";


export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer :Character[], private enemies :Monstre[]) {
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

    public start = () : void => {
        console.log("⚔️ Le combat commence !");
        do { 
            this.takeTurn();
    
        } while (this.isTeamDefeated(this.adventurer) || this.isTeamDefeated(this.enemies));

        this.endFight();
    }

    public takeTurn = () : void => {
        const currentFighter = this.fighters[this.currentTurnIndex];
        const typedejoueur = Object.getPrototypeOf(currentFighter)
        if (typedejoueur === Character) {
            if (!currentFighter.isAlive()) {
                console.log(`❌ ${currentFighter.name} est K.O.`);
                this.nextTurn();
                return;
            }
        }
        Menu.action(currentFighter, this.enemies,this.fighters);
    
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

    public endFight = (): boolean => {
        if (this.isTeamDefeated(this.adventurer)) {
            console.log("💀 Tous les aventuriers sont K.O. ! GAME OVER.");
            return true
        } else if (this.isTeamDefeated(this.enemies)) {
            console.log("🏆 Victoire ! Les aventuriers ont triomphé du combat ! Youpiiiiiii");
            return true
        }
        return false
    }    
}