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
        const choices = prompt(`${Style.ClearTerminal}Choisissez 3 aventuriers parmi les 6 disponibles \n 1: ${Color.Green}Guerrier${Style.Reset} \n 2: ${Color.Green}Mage${Style.Reset} \n 3: ${Color.Green}Paladin${Style.Reset} \n 4: ${Color.Green}Barbare${Style.Reset} \n 5: ${Color.Green}Prêtre${Style.Reset} \n 6: ${Color.Green}Voleur${Style.Reset}\nEntrez trois numéros séparés par des virgules (ex : 1,2,3) \n`);

        if (!choices) return this.startMenu();

        const adventurerIndex = choices.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 6);

        if (adventurerIndex.length !== 3) {
            console.log(`${Style.Erreur}Vous devez choisir exactement ${Style.Bold}3${Style.AfterNumberErreur} aventuriers parmi les options disponibles.${Style.Reset}\n`);
            return this.startMenu();
        }

        const selectedAdventurers :Character[] = adventurerIndex.map(index => new options[index - 1](options[index - 1].name));

        prompt(`Aventuriers sélectionnés : ${selectedAdventurers.map(character => Color.Blue+character.name+Style.Reset).join(", ")} \nAppuyez sur Entrée`);

        return selectedAdventurers;
    }

    static action = (currentFighter: Character, enemies: Monstre[], characters: Character[]): void => {
        let action: string | null;
        prompt(`\nC'est à ${Color.Blue}${currentFighter.name}${Style.Reset} de jouer. \nAppuyez sur Entrée`);
    
        // Vérifie si l'attaquant a une attaque spéciale
        if (currentFighter instanceof Guerrier) {
            action = prompt(`Quelle action voulez vous effectuer? Choisissez un numéro\n1: ${Color.BrightRed}Attaquer${Style.Reset} \n2: ${Color.Yellow}Utiliser un objet${Style.Reset} \n`);
            if (!action || !["1", "2"].includes(action)) {
                console.log(`${Style.Erreur}Choix invalide. Veuillez choisir entre ${Style.Bold}1${Style.AfterNumberErreur} ou ${Style.Bold}2${Style.AfterNumberErreur}.${Style.Reset}\n`);
                return this.action(currentFighter, enemies, characters);
            }
        } else {
            action = prompt(`Quelle action voulez vous effectuer? \n1: ${Color.BrightRed}Attaquer${Style.Reset} \n2: ${Color.Yellow}Utiliser un objet${Style.Reset} \n3: ${Color.Magenta}Action Spéciale${Style.Reset} \n`);
            if (!action || !["1", "2", "3"].includes(action)) {
                console.log(this.alert);
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

            let index: number;
            let targetIndex: string|null = null;
            do{
                targetIndex = prompt(`${enemyList}-1. ${Color.Red}retour${Style.Reset} \n`);
                index = parseInt(targetIndex ?? "", 10) - 1;
                if (targetIndex === "-1") {
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }else if (index < 0 || index >= livingEnemies.length) {
                    console.log(this.alert);
                }
            }while (index < 0 || index >= livingEnemies.length && targetIndex !== "-1");
            
            let confirm: string|null = null;
            do{confirm = prompt(`Veux-tu attaquer ${Color.Red}${livingEnemies[index].name}${Style.Reset}? [y,n]`);}
            while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
            if (confirm === "y" || confirm === "yes" || confirm === "") {
                const target = livingEnemies[index];
                prompt(`Vous avez choisi d'attaquer ${Color.Red}${target.name}${Style.Reset}. \nAppuyez sur Entrée`);
                prompt(`${currentFighter.attack(target)}`);
            } else{
                return this.action(currentFighter, livingEnemies, livingCharacters);
            }
        } else if (action === "3" && !(currentFighter instanceof Guerrier)) { // attack spécial
            if (currentFighter instanceof Pretre) {
                let characterList = `Choisissez un allié à ${Color.Green}soigner${Style.Reset} :\n`;
                livingCharacters.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset} `);
                let index = parseInt(targetIndex ?? "", 10) - 1;
                do{ 
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, livingCharacters);
                    }else if (index !>= 0 && index !<= livingCharacters.length) {
                        console.log(this.alert);
                        targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset} `);
                        index = parseInt(targetIndex ?? "", 10) - 1;
                    }
                }while(index !>= 0 && index !<= livingCharacters.length && targetIndex !== "-1");

                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'action spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingCharacters[index])}`);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            } else if(currentFighter instanceof Paladin){
                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attaque spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset}? [y,n]\n`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingEnemies)}\nAppuyez sur Entrée`);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            }else{
                let characterList = `Choisissez un ennemi à ${Color.BrightRed}attaquer${Style.Reset} :\n`;
                livingEnemies.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Red}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset} `);
                let index = parseInt(targetIndex ?? "", 10) - 1;
                while (index !>= 0 && index !<= livingEnemies.length && targetIndex !== "-1") {
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, livingCharacters);
                    }else if (index !>= 0 && index !<= livingEnemies.length) {
                        console.log(this.alert);
                        targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset} `);
                        index = parseInt(targetIndex ?? "", 10) - 1;
                    }
                }

                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attack spéciale ${Color.Yellow}${currentFighter.specialAttackName}${Style.Reset} sur ${Color.Red}${livingEnemies[index].name}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");

                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingEnemies[index])}`);
                } else{
                    return this.action(currentFighter, livingEnemies, livingCharacters);
                }
            }
        } else if (action === "2"){ //  utiliser l'inventaire
            if (bagage.inventaire.length === 0) {
                console.log("Vous n'avez plus d'objets, essayer d'en voler ou d'en collecter dans des coffres.");
            } else {
                const itemNames = bagage.inventaire.map((item, index) => `${index + 1}. ${Color.Yellow}${item.name}${Style.Reset}`).join("\n");
                const choice = prompt(`Choisissez l'objet à utiliser : \n${itemNames}\n -1. ${Color.Red}retour${Style.Reset} `);
                const itemIndex = parseInt(choice ?? "", 10) - 1;  // ?? vérifie que la valeur ne sois pas falsy sinon return "" et parsint le transforme en nombre de base 10
                
                if (choice === "-1") {
                    return this.action(currentFighter, enemies, characters);
                } else if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < bagage.inventaire.length) {
                    const selectedItem = bagage.inventaire[itemIndex];
                    prompt(`Objet choisi : ${selectedItem.name}`);
                    
                    let potionList = `Choisissez sur qui vous voulez utiliser ${Color.Green}${selectedItem.name}${Style.Reset} :\n`;
                    livingCharacters.forEach((character, index) => {
                        potionList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset}\n`;
                    });
                
                    let targetIndex = prompt(`${potionList}-1. ${Color.Red}retour${Style.Reset} `);
                    let index = parseInt(targetIndex ?? "", 10) - 1;
                
                    do {
                        if (targetIndex === "-1") {
                            return this.action(currentFighter, livingEnemies, livingCharacters);
                        } else if (index < 0 || index >= livingCharacters.length) {
                            console.log(this.alert);
                            targetIndex = prompt(`${potionList}-1. ${Color.Red}retour${Style.Reset} `);
                            index = parseInt(targetIndex ?? "", 10) - 1;
                        }
                    } while ((index < 0 || index >= livingCharacters.length) && targetIndex !== "-1");
                
                    const target = livingCharacters[index];
                    let confirm: string | null = null;
                
                    do {
                        confirm = prompt(`Veux-tu utiliser la potion ${Color.Magenta}${selectedItem.name}${Style.Reset} sur ${target.name}? [y,n]`);
                    } while (confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                
                    if (confirm === "y" || confirm === "yes" || confirm === "") {
                        prompt(`${bagage.inventaire[itemIndex].use(target)}`);
                        bagage.inventaire.splice(itemIndex, 1);
                    } else {
                        return this.action(currentFighter, livingEnemies, livingCharacters);
                    }
                }
                
            }                
        }else{
            console.log("CACA");
        }
    }
}