import { Fight } from "./Fight.ts";
import { Character } from "./classCharacters/Character.ts";
import { Basilic } from "./classCharacters/classMonstres/Basilic.ts";
import { Chimere } from "./classCharacters/classMonstres/Chimere.ts";
import { Golem } from "./classCharacters/classMonstres/Golem.ts";
import { Spectre } from "./classCharacters/classMonstres/Spectre.ts";
import { Vampire } from "./classCharacters/classMonstres/Vampire.ts";
import { DragonAncien } from "./classCharacters/Boss/DragonAncien.ts";
import { LicheSombre } from "./classCharacters/Boss/LicheSombre.ts";
import { TitanCorrompu } from "./classCharacters/Boss/TitanCorrompu.ts";
import { Coffre } from "./Coffre.ts";
import { Inventaire } from "./Inventaire.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { bagage, Characters } from "./GameManagerTest.ts";
import { HalfStar } from "./classConsommables/HalfStar.ts";
import { Color, Style } from "./Color.ts";
export class GameManager{
    
    salle = 0;

    mainLoop(): void {
        const characters = Characters;
        const Bagage = bagage;
        const classMonsters: (new () => Monstre)[] = [Basilic, Chimere, Golem, Spectre, Vampire];

        this.nextSalle(characters, classMonsters, Bagage);

        do {
            if (this.salle === 6) {
                console.log(Style.ClearTerminal+"Félicitations ! Vous avez terminé 5 salles avec au moins un aventurier vivant !");
                prompt(`Pour vous récompenser voici une demi-étoile !`);
                Bagage.add(new HalfStar());
                let continuer = null
                do{
                    continuer = prompt("Voulez vous continuer à jouer ? [y,n]");
                    if (continuer === "y" || continuer === "yes") {
                        this.nextSalle(characters, classMonsters, Bagage);
                        this.salle = 1;
                    } else if(continuer === "n" || continuer === "non"){
                        return;
                    }else{
                        console.log(`${Style.Bold}${Style.Italic}${Color.BrightCyan}Veuillez entrer quelque chose de correcte !${Style.Reset}`)
                    }
                }while(continuer !== "y" && continuer !== "yes" && continuer !== "n" && continuer !== "non")
            } else if (characters.length > 0){
                console.log("Félicitations ! Vous avez terminé une salle avec au moins 1 aventurier vivant !");
                this.nextSalle(characters,classMonsters,Bagage);
            }else{return}
        }while(true)
    }

    nextSalle(characters :Character[], Monsters :(new () => Monstre)[], Bagage :Inventaire): void {
        this.salle++;
        console.log(`🕌 Salle ${this.salle}`);
        this.resetCharacterSpeed(characters);

        if (this.salle === 1 || this.salle === 3) {
            this.combatAleatoire(characters, Monsters);
        } else if (this.salle === 2 || this.salle === 4) {
            this.ouvrirCoffre(characters, Bagage);
        } else if (this.salle === 5) {
            this.combatBoss(characters);
        }
        
    }

    private resetCharacterSpeed(characters: Character[]): void {
        characters.forEach(character => {
            character.speed = character.baseSpeed; 
        });
    }

    combatAleatoire(characters: Character[], classMonsters: (new () => Monstre)[]): void {
        prompt("Combat aléatoire !");
        const shuffledMonsters = classMonsters.sort(() => 0.5 - Math.random()).slice(0, 3);
        const monsters = shuffledMonsters.map(MonsterClass => new MonsterClass());
        const monsterNames = monsters.map(monster => Color.Red + monster.name + Style.Reset).join(", ");
        console.log(`Vous rencontrez les monstres : ${monsterNames}. \nPréparez-vous au combat !`);
        const fight = new Fight(characters, monsters);
        fight.start();
    }

    ouvrirCoffre(characters: Character[], bagage: Inventaire): void {
        prompt("Salle de coffre !")
        const coffre = new Coffre();
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        coffre.open(bagage, randomCharacter);
    }

    combatBoss(characters: Character[]): void {
        prompt("Combat de boss !")
        const bosses: (new () => Monstre)[] = [DragonAncien, LicheSombre, TitanCorrompu];
        const randomIndex = Math.floor(Math.random() * bosses.length);
        const BossClass = bosses[randomIndex];
        const boss = new BossClass();
        const fight = new Fight(characters, [boss]);
        console.log(`Vous affrontez le boss ${boss.name}`);
        fight.start();
    }
}