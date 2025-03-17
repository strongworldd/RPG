import { Fight } from "./Fight.ts";
import { Menu } from "./Menu.ts";
import { Character } from "./classCharacters/Character.ts";
import { Basilic } from "./classCharacters/classMonstres/Basilic.ts";
import { Chimère } from "./classCharacters/classMonstres/Chimère.ts";
import { Golem } from "./classCharacters/classMonstres/Golem.ts";
import { Spectre } from "./classCharacters/classMonstres/Spectre.ts";
import { Vampire } from "./classCharacters/classMonstres/Vampire.ts";
import { DragonAncien } from "./classCharacters/Boss/DragonAncien.ts";
import { LicheSombre } from "./classCharacters/Boss/LicheSombre.ts";
import { TitanCorrompu } from "./classCharacters/Boss/TitanCorrompu.ts";
import { Coffre } from "./Coffre.ts";
import { Inventaire } from "./Inventaire.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
export class GameManager extends Character {
    constructor() {
        super("name", 0, 0, 0, 0, 0);
    }

    mainLoop(): void {
        const characters = Menu.startMenu();
        const inventaire = new Inventaire();
        const classMonsters: (new () => Monstre)[] = [Basilic, Chimère, Golem, Spectre, Vampire];

        console.log("Salle 1 : Combat aléatoire");
        this.combatAleatoire(characters, classMonsters);

        console.log("Salle 2 : Coffre");
        this.ouvrirCoffre(characters, inventaire);

        console.log("Salle 3 : Combat aléatoire");
        this.combatAleatoire(characters, classMonsters);

        console.log("Salle 4 : Coffre");
        this.ouvrirCoffre(characters, inventaire);

        console.log("Salle 5 : Boss");
        this.combatBoss(characters);

        if (characters.some(character => character.isAlive())) {
            console.log("Félicitations ! Vous avez terminé le donjon avec au moins un aventurier vivant !");
        } else {
            console.log("Tous les aventuriers sont morts. GAME OVER.");
        }
    }

    combatAleatoire(characters: Character[], classMonsters: (new () => Monstre)[]): void {
        const shuffledMonsters = classMonsters.sort(() => 0.5 - Math.random()).slice(0, 3);
        const monsters = shuffledMonsters.map(MonsterClass => new MonsterClass());
        const fight = new Fight(characters, monsters);
        console.log("Vous rencontrez les monstres", monsters.map(enemy => enemy.name));
        fight.start();
        while (!fight.endFight()) {
            fight.takeTurn();
        }
    }

    ouvrirCoffre(characters: Character[], inventaire: Inventaire): void {
        const coffre = new Coffre();
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        coffre.open(inventaire, randomCharacter);
    }

    combatBoss(characters: Character[]): void {
        const bosses: (new () => Monstre)[] = [DragonAncien, LicheSombre, TitanCorrompu];
        const randomIndex = Math.floor(Math.random() * bosses.length);
        const BossClass = bosses[randomIndex];
        const boss = new BossClass();
        const fight = new Fight(characters, [boss]);
        console.log(`Vous affrontez le boss ${boss.name}`);
        fight.start();
        while (!fight.endFight()) {
            fight.takeTurn();
        }
    }
}