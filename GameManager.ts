import { Fight } from "./Fight.ts";
import { Menu } from "./Menu.ts";
import Character from "./classCharacters/Character.ts";
import { Basilic } from "./classCharacters/classMonstres/Basilic.ts";
import { Chimère } from "./classCharacters/classMonstres/Chimère.ts";
import { Golem } from "./classCharacters/classMonstres/Golem.ts";
import { Spectre } from "./classCharacters/classMonstres/Spectre.ts";
import { Vampire } from "./classCharacters/classMonstres/Vampire.ts";

export class GameManager extends Character{
    static mainLoop(): void{
        const characters = Menu.startMenu()
        const classmonsters = [Basilic,Chimère,Golem,Spectre,Vampire]
        const shuffledMonsters = classmonsters.sort(() => 0.5 - Math.random()).slice(0, 3);
        const monsters = shuffledMonsters.map(MonsterClass => new MonsterClass());
        const fight = new Fight(characters, monsters);
        console.log("Vous rencontrez les monstres",monsters.map(enemy => enemy.name))
        fight.start();
        while (fight.endFight){
            fight.takeTurn();
        }
        console.log("gg")
    }
}