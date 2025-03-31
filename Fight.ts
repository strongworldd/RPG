import { Character } from "./classCharacters/Character.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Menu } from "./Menu.ts";
import { Color, Style } from "./Color.ts";
import { DragonAncien } from "./classCharacters/Boss/DragonAncien.ts";
import { LicheSombre } from "./classCharacters/Boss/LicheSombre.ts";
import { TitanCorrompu } from "./classCharacters/Boss/TitanCorrompu.ts";
export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer: Character[], private enemies: Monstre[]) {
        this.fighters = this.determineTurnOrder();
    }

    private determineTurnOrder = (): Character[] => {
        const participants: Character[] = [...this.adventurer, ...this.enemies];
        participants.sort((a, b) => b.speed - a.speed); // Trie par vitesse décroissante
        return participants;
    }

    private isTeamDefeated = (team: Character[]): boolean => {
        return team.every(character => !character.isAlive());
    }

    public start = (): void => {
        console.log("⚔️  Le combat commence !");
        do {
            this.takeTurn();
        } while (!this.isTeamDefeated(this.adventurer) && !this.isTeamDefeated(this.enemies));

        this.endFight();
    }

    public takeTurn = (): void => {
        const currentFighter = this.fighters[this.currentTurnIndex];

        if (!currentFighter.isAlive()) {
            console.log(`❌ ${currentFighter.name} est K.O.`);
            return this.nextTurn();
        }

        if (this.adventurer.includes(currentFighter)) {
            Menu.action(currentFighter, this.enemies, this.adventurer);
        } else {
            this.enemyAction(currentFighter as Monstre);
        }
        this.nextTurn();
    }

    
    private enemyAction = (enemy: Monstre): void => {
        const vivantAventuriers = this.adventurer.filter(aventurier => aventurier.isAlive());
        let cible = vivantAventuriers[Math.floor(Math.random() * vivantAventuriers.length)];

        if (cible) {
            const random = Math.random();
            if (random < 0.2) {
                cible = vivantAventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
            } else {
                const index = Math.floor(Math.random() * vivantAventuriers.length);
                cible = vivantAventuriers[index];
            }
            
            let attackMessage = ""
            if(enemy instanceof DragonAncien || enemy instanceof LicheSombre || enemy instanceof TitanCorrompu){
                attackMessage = enemy.attackBoss(vivantAventuriers)
            }else{
                console.log(`${Color.Red}${enemy.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} !`);
                attackMessage = enemy.attackMonstre(cible); 
            }
            prompt(attackMessage); 
        }
    }

    private nextTurn = (): void => {
        this.currentTurnIndex++;
        if (this.currentTurnIndex >= this.fighters.length) {
            this.currentTurnIndex = 0;
        }

        if (this.isTeamDefeated(this.fighters)) {
            console.log("💀 Tous les combattants sont K.O. ! Fin du combat.");
            return;
        }

        while (!this.fighters[this.currentTurnIndex].isAlive()) {
            this.currentTurnIndex++;
            if (this.currentTurnIndex >= this.fighters.length) {
                this.currentTurnIndex = 0;
            }
        }
    }

    public endFight = (): boolean => {
        if (this.isTeamDefeated(this.adventurer)) {
            console.log("💀 Tous les aventuriers sont K.O. ! GAME OVER.");
            return true;
        } else if (this.isTeamDefeated(this.enemies)) {
            console.log("🏆 Victoire ! Les aventuriers ont triomphé du combat ! Youpiiiiiii");
            return true;
        }
        return false;
    }
}