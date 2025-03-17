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
    
        const livingEnemies = enemies.filter(enemy => enemy.isAlive());
        const livingCharacters = characters.filter(character => character.isAlive());
    
        if (action === "1") { // attaque classique
            let enemyList = `Choisissez l'ennemi à attaquer :\n`;
            livingEnemies.forEach((enemy, index) => {
                enemyList += ` ${index + 1}. ${Color.Red}${enemy.name}${Style.Reset}\n`;
            });
    
            let targetIndex = prompt(`${enemyList}${Color.Red}retour${Style.Reset} : -1`);
            let index = parseInt(targetIndex ?? "", 10) - 1;
            while (index !>= 0 && index !<= livingCharacters.length && targetIndex !== "-1") {
                if (targetIndex === "-1") {
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
                console.log(this.alert);
                targetIndex = prompt(`${enemyList}${Color.Red}retour${Style.Reset} : -1`);
                index = parseInt(targetIndex ?? "", 10) - 1;
            }

            let confirm: string|null = null;
            do{confirm = prompt(`Veux-tu utiliser l'action spéciale ${Color.Yellow}Spécial Heal${Style.Reset}? [y,n]`);}
            while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non");
            if (confirm === "y" || confirm === "yes") {
                const target = livingEnemies[index];
                prompt(`Vous avez choisi d'attaquer ${Color.Red}${target.name}${Style.Reset}.`);
                currentFighter.attack(target);
            } else{
                return this.action(currentFighter, livingEnemies, livingCharacters);
            }
        } else if (action === "2" && methodCount.length > 1) { // attack spécial
            if (currentFighter instanceof Pretre) {
                let characterList = `Choisissez un allié à ${Color.Green}soigner${Style.Reset} :\n`;
                livingCharacters.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${characterList}${Color.Red}retour${Style.Reset} : -1`);
                let index = parseInt(targetIndex ?? "", 10) - 1;
                while (index !>= 0 && index !<= livingCharacters.length && targetIndex !== "-1") {
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, livingCharacters);
                    }
                    console.log(this.alert);
                    targetIndex = prompt(`${characterList}${Color.Red}retour${Style.Reset} : -1`);
                    index = parseInt(targetIndex ?? "", 10) - 1;
                }

                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'action spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non");
                if (confirm === "y" || confirm === "yes") {
                    currentFighter.specialAttack(livingCharacters[index]);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            } else if(currentFighter instanceof Paladin){
                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attack spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non");

                if (confirm === "y" || confirm === "yes") {
                    currentFighter.divinAttack(livingEnemies);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            }else{
                let characterList = `Choisissez un ennemi à ${Color.BrightRed}attaquer${Style.Reset} :\n`;
                livingEnemies.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Red}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${characterList}${Color.Red}retour${Style.Reset} : -1`);
                let index = parseInt(targetIndex ?? "", 10) - 1;
                while (index !>= 0 && index !<= livingEnemies.length && targetIndex !== "-1") {
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, livingCharacters);
                    }
                    console.log(this.alert);
                    targetIndex = prompt(`${characterList}${Color.Red}retour${Style.Reset} : -1`);
                    index = parseInt(targetIndex ?? "", 10) - 1;
                }

                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attack spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset} sur ${Color.Red}${livingEnemies[index].name}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non");

                if (confirm === "y" || confirm === "yes") {
                    currentFighter.specialAttack(livingEnemies[index]);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            }
        } else{ // action === "3" utiliser l'inventaire
            if (bagage.length === 0) {
                console.log("Vous n'avez plus d'objets, essayer d'en voler ou d'en collecter dans des coffres.");
            } else {
                let itemIndex: number;
                let itemNames: string;
                let choice: string | null;
                do{
                    itemNames = bagage.map((item, index) => `${index + 1}. ${Color.Yellow}${item.name}${Style.Reset}`).join("\n");
                    choice = prompt(`Choisissez l'objet à utiliser : \n${itemNames}\n ${Color.Red}retour${Style.Reset} : -1`);
                    itemIndex = parseInt(choice ?? "", 10) - 1;  // ?? vérifie que la valeur ne sois pas falsy sinon return "" et parsint le transforme en nombre de base 10
                    
                    if (choice === "-1") {
                        return this.action(currentFighter, enemies, characters);
                    } else if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < bagage.length) {
                        const selectedItem = bagage[itemIndex];
                        console.log(`Objet choisi : ${selectedItem.name}`);
                        Object.getPrototypeOf(selectedItem).use(currentFighter);
                        bagage.splice(itemIndex, 1);
                    } else {
                        console.log("Choix invalide. Veuillez entrer un numéro valide.");
                    }
                }while(!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < bagage.length)
            }                
        }
    }
}