import { Character } from "./classCharacters/Character.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Basilic } from "./classCharacters/classMonstres/Basilic.ts";
import { Chimère } from "./classCharacters/classMonstres/Chimère.ts";
import { Golem } from "./classCharacters/classMonstres/Golem.ts";
import { Spectre } from "./classCharacters/classMonstres/Spectre.ts";
import { Vampire } from "./classCharacters/classMonstres/Vampire.ts";
import { DragonAncien } from "./classCharacters/Boss/DragonAncien.ts";
import { LicheSombre } from "./classCharacters/Boss/LicheSombre.ts";
import { TitanCorrompu } from "./classCharacters/Boss/TitanCorrompu.ts";
import { Menu } from "./Menu.ts";
export class Fight {
    private fighters: Character[];
    private currentTurnIndex: number = 0;

    constructor(private adventurer: Character[], private enemies: Monstre[]) {
        this.fighters = this.determineTurnOrder();
    }

    private determineTurnOrder = (): Character[] => {
        const participants: Character[] = [...this.adventurer, ...this.enemies];
        participants.sort((a, b) => b.speed - a.speed);
        return participants;
    }

    private isTeamDefeated = (team: Character[]): boolean => {
        return team.every(character => !character.isAlive());
    }

    public start = (): void => {
        console.log("⚔️ Le combat commence !");
        do {
            this.takeTurn();
        } while (!this.isTeamDefeated(this.adventurer) && !this.isTeamDefeated(this.enemies));

        this.endFight();
    }

    public takeTurn = (): void => {
        const currentFighter = this.fighters[this.currentTurnIndex];

        if (!currentFighter.isAlive()) {
            console.log(`❌ ${currentFighter.name} est K.O.`);
            this.nextTurn();
            return;
        }

        if (this.adventurer.includes(currentFighter)) {
            Menu.action(currentFighter, this.enemies, this.adventurer);
        } else {
            this.enemyAction(currentFighter as Monstre);
        }

        this.nextTurn();
    }

    private enemyAction = (enemy: Monstre): void => {
        const target = this.adventurer[Math.floor(Math.random() * this.adventurer.length)];
        console.log(`${enemy.name} attaque ${target.name} !`);
        enemy.attack(target);

        // Appel des méthodes spécifiques des monstres
        if (enemy instanceof Spectre) {
            (enemy as Spectre).actSpectre(this.adventurer);
        } else if (enemy instanceof Basilic) {
            (enemy as Basilic).agir(this.adventurer);
        } else if (enemy instanceof Chimère) {
            (enemy as Chimère).actChimère(this.adventurer);
        } else if (enemy instanceof Golem) {
            (enemy as Golem).actGolem(this.adventurer);
        } else if (enemy instanceof Vampire) {
            (enemy as Vampire).actVampire(this.adventurer);
        } else if (enemy instanceof DragonAncien) {
            (enemy as DragonAncien).agir(this.adventurer);
        } else if (enemy instanceof LicheSombre) {
            (enemy as LicheSombre).agir(this.adventurer);
        } else if (enemy instanceof TitanCorrompu) {
            (enemy as TitanCorrompu).agir(this.adventurer);
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