import { Character } from "./classCharacters/Character.ts";
import { Guerrier } from "./classCharacters/Guerrier.ts";
import { Pretre } from "./classCharacters/Pretre.ts";
import { Paladin } from "./classCharacters/Paladin.ts";
import { Mage } from "./classCharacters/Mage.ts";
import { Barbare } from "./classCharacters/Barbare.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Voleur } from "./classCharacters/Voleur.ts";
import { bagage } from "./GameManagerTest.ts";
import { Color, Style } from "./Color.ts";

export class Menu{
    static alert :string =  `${Style.Erreur}Choix invalide. Veuillez choisir entre ${Style.Bold}1${Style.AfterNumberErreur}, ${Style.Bold}2${Style.AfterNumberErreur} ou ${Style.Bold}3${Style.AfterNumberErreur}.${Style.Reset}\n`;
    static startMenu(): Character[] {
        const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur];
        const choices = prompt(`Choisissez 3 aventuriers parmi les 6 disponibles \n ${Color.Green}Guerrier${Style.Reset}: 1 \n ${Color.Green}Mage${Style.Reset}: 2 \n ${Color.Green}Paladin${Style.Reset}: 3 \n ${Color.Green}Barbare${Style.Reset}: 4 \n ${Color.Green}Prêtre${Style.Reset}: 5 \n ${Color.Green}Voleur${Style.Reset}: 6\nEntrez trois numéros séparés par des virgules (ex : 1,2,3) \n`);

        if (!choices) return this.startMenu();

        const adventurerIndex = choices.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 6);

        if (adventurerIndex.length !== 3) {
            console.log(`${Style.Erreur}Vous devez choisir exactement ${Style.Bold}3${Style.AfterNumberErreur} aventuriers parmi les options disponibles.${Style.Reset}\n`);
            return this.startMenu();
        }

        const selectedAdventurers :Character[] = adventurerIndex.map(index => new options[index - 1](options[index - 1].name));

        prompt(`Aventuriers sélectionnés : ${selectedAdventurers.map(character => Color.Blue+character.name+Style.Reset).join(", ")}`);

        return selectedAdventurers;
    }

    static action = (currentFighter: Character, enemies: Monstre[], characters: Character[]): void => {
        const methodCount = Object.getOwnPropertyNames(Object.getPrototypeOf(currentFighter));
        let action: string | null;
        prompt(`\nC'est à ${Color.Blue}${currentFighter.name}${Style.Reset} de jouer.`); // on voit pas le nom zeubi
    
        // Vérifier si l'attaquant a une attaque spéciale
        if (methodCount.length > 1) {
            action = prompt(`Quelle action voulez vous effectuer? \n ${Color.BrightRed}Attaquer${Style.Reset}: 1 \n ${Color.Magenta}Action Spéciale${Style.Reset}: 2 \n ${Color.Yellow}Utiliser un objet${Style.Reset}: 3 \n`);
            if (!action || !["1", "2", "3"].includes(action)) {
                prompt(this.alert);
                return this.action(currentFighter, enemies, characters);
            }
        } else {
            action = prompt(`Quelle action voulez vous effectuer? \n ${Color.BrightRed}Attaquer${Style.Reset}: 1 \n ${Color.Yellow}Utiliser un objet${Style.Reset}: 2 \n`);
            if (!action || !["1", "2"].includes(action)) {
                console.log(`${Style.Erreur}Choix invalide. Veuillez choisir entre ${Style.Bold}1${Style.AfterNumberErreur}ou ${Style.Bold}2${Style.AfterNumberErreur}.${Style.Reset}\n`);
                return this.action(currentFighter, enemies, characters);
            }
        }
    
        let target: Monstre | null = null;
        let targetCharacter: Character |null=null;
        const livingEnemies = enemies.filter(enemy => enemy.isAlive());
        const livingCharacters = characters.filter(character => character.isAlive());
    
        if (action === "1") {
            let enemyList = "Choisissez l'ennemi à attaquer :\n";
            livingEnemies.forEach((enemy, index) => {
                enemyList += ` ${index + 1}. ${Color.Red}${enemy.name}${Style.Reset}\n`;
            });
    
            let targetIndex = prompt(enemyList);
            while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                console.log(this.alert);
                targetIndex = prompt(enemyList);
            }
    
            target = livingEnemies[parseInt(targetIndex) - 1];
            prompt(`Vous avez choisi d'attaquer ${Color.Red}${target.name}${Style.Reset}.`);
            prompt(currentFighter.attack(target));
    
        } else if (action === "2" && methodCount.length > 1) {
            if (methodCount[1] === "specialheal") {
                let characterList = `Choisissez un allié à ${Color.Green}soigner${Style.Reset} :\n`;
                livingCharacters.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(characterList);
                while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                    console.log(this.alert);
                    targetIndex = prompt(characterList);
                }
    
                targetCharacter = livingCharacters[parseInt(targetIndex) - 1];
                currentFighter.attack(targetCharacter, methodCount[1]);
            } else {
                let enemyList = `Choisissez l'ennemi à ${Color.BrightRed}attaquer${Style.Reset} :\n`;
                livingEnemies.forEach((enemy, index) => {
                    enemyList += `${index + 1}. ${Color.Red}${enemy.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(enemyList);
                while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                    console.log(this.alert);
                    targetIndex = prompt(enemyList);
                }
    
                target = livingEnemies[parseInt(targetIndex) - 1];
                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'action spéciale ${Color.Yellow}${methodCount[1]}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non");
    
                if (confirm === "y" || confirm === "yes") {
                    prompt(currentFighter.attack(target, methodCount[1]));
                } else{
                    return this.action(currentFighter, enemies, characters);
                }
            }
        } else{
            if (bagage.length === 0) {
                console.log("Vous n'avez plus d'objets, essayer d'en voler ou d'en colecter dans des coffres.");
            } else {
                const itemNames = bagage.map((item, index) => `${index + 1}. ${Color.Yellow}${item.name}${Style.Reset}`).join("\n");
                const choice = prompt(`Choisissez l'objet à utiliser : \n${itemNames}`);
            
                // Vérifie si l'entrée est un nombre valide
                const itemIndex = parseInt(choice ?? "", 10) - 1;
                
                if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < bagage.length) {
                    const selectedItem = bagage[itemIndex];
                    console.log(`Objet choisi : ${selectedItem.name}`);
                    // Ici, tu peux ajouter la logique pour utiliser l'objet
                } else {
                    console.log("Choix invalide. Veuillez entrer un numéro valide.");
                    return this.action(currentFighter, enemies, characters);
                }
            }                
        }
    }
}
