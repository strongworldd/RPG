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

export class Menu {
    static firstOpen = true
    static menuInfo(){
        const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur];
        console.log(`${Style.ClearTerminal}${Color.Yellow}=== Informations des Objets Consommables ===${Style.Reset}`);
        console.log(`${Color.BrightMagenta}Ether${Style.Reset}             - ${Color.Cyan}Régénère Mana: 50${Style.Reset}`);
        console.log(`${Color.BrightMagenta}Potion de soin${Style.Reset}    - ${Color.Green}Régénère Vie: 50${Style.Reset}`);
        console.log(`${Color.BrightMagenta}Morceau d'étoiles${Style.Reset} - ${Color.Green}Régénère Vie: 20${Style.Reset}  - ${Color.BrightGreen}Ressuscite avec: 20 PV${Style.Reset}`);
        console.log(`${Color.BrightMagenta}Demi-étoile${Style.Reset}       - ${Color.Green}Régénère Vie: 100${Style.Reset} - ${Color.BrightGreen}Ressuscite avec: 50 PV${Style.Reset}`);
        console.log(`\n${Color.Yellow}=== Informations des Aventuriers ===${Style.Reset}`);
        options.forEach(option => {
            console.log(`${option.displayInfo()}`);
        }); 
        
        prompt(`\nAppuyez sur Entrée pour continuer...`);
        console.log(`\n${Color.Yellow}=== Informations des Monstres ===${Style.Reset}`);
        console.log(`${Color.Red}Vampire Sanguinaire${Style.Reset} - ${Color.BrightRed}Attaque: 25${Style.Reset} - ${Color.Green}Défense: 7${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Première attaque:${Style.Reset} Se régénère de 10 PV`);
        console.log(`${Color.Red}Spectre Hanté${Style.Reset}       - ${Color.BrightRed}Attaque: 20${Style.Reset} - ${Color.Green}Défense: 5${Style.Reset} - ${Color.Cyan}PV Max: 80${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Devient éthéré et esquive les attaques jusqu'à son prochain tour`);
        console.log(`${Color.Red}Golem de Pierre${Style.Reset}     - ${Color.BrightRed}Attaque: 15${Style.Reset} - ${Color.Green}Défense: 0${Style.Reset} - ${Color.Cyan}PV Max: 125${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Active sa peau de pierre et augmente sa vie max de 50`);
        console.log(`${Color.Red}Chimère Mutante${Style.Reset}     - ${Color.BrightRed}Attaque: 20${Style.Reset} - ${Color.Green}Défense: 5${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Change de forme et augmente son attaque de 5`);
        console.log(`${Color.Red}Basilic Venimeux${Style.Reset}    - ${Color.BrightRed}Attaque: 28${Style.Reset} - ${Color.Green}Défense: 6${Style.Reset} - ${Color.Cyan}PV Max: 80${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Ralentit un aventurier de 1 point`);
        console.log(`\n${Color.Yellow}=== Informations des Boss ===${Style.Reset}`);
        console.log(`${Color.Red}Dragon Ancien${Style.Reset}     - ${Color.BrightRed}Attaque: 50${Style.Reset} - ${Color.Green}Défense: 10${Style.Reset} - ${Color.Cyan}PV Max: 200${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Rugit, intimidant ses ennemis et réduisant leur attaque`);
        console.log(`${Color.Red}Liche Sombre${Style.Reset}      - ${Color.BrightRed}Attaque: 30${Style.Reset} - ${Color.Green}Défense: 10${Style.Reset} - ${Color.Cyan}PV Max: 175${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Invoque une aura de terreur, drainant la vitalité de ses ennemis`);
        console.log(`${Color.Red}Titan Corrompu${Style.Reset}    - ${Color.BrightRed}Attaque: 40${Style.Reset} - ${Color.Green}Défense: 10${Style.Reset} - ${Color.Cyan}PV Max: 200${Style.Reset}\n${Color.Orange}Première attaque: ${Style.Reset}Frappe le sol, créant une onde de choc qui réduit la vitesse de ses ennemis`);
        prompt(`\nAppuyez sur Entrée pour continuer...`);
    }
    
    static alert :string = `${Style.Erreur}Choix invalide. Veuillez choisir entre ${Style.Bold}1${Style.AfterNumberErreur}, ${Style.Bold}2${Style.AfterNumberErreur} ou ${Style.Bold}3${Style.AfterNumberErreur}.${Style.Reset}\n`;
    static startMenu(): Character[] {
        if (this.firstOpen) {
            this.firstOpen = false
            this.menuInfo()
        }

        const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur];
        let characterlist = `${this.firstOpen ? "Choisissez 3 aventuriers parmi les 6 disponibles \n I: ${Color.Blue}Informations${Style.Reset}\n" : Style.ClearTerminal}Choisissez 3 aventuriers parmi les 6 disponibles \n I: ${Color.Blue}Informations${Style.Reset}\n`;
        options.forEach((character, index) => {
            characterlist += ` ${index + 1}. ${Color.Green}${character.name}${Style.Reset} \n`;
        });
        characterlist += `Entrez ${Style.Bold}trois${Style.Reset} numéros séparés par des virgules (ex : 1,2,3) ou la lettre I pour accéder aux informations du jeu\n`
        const choices = prompt(`${characterlist}`)

        if (choices == "I" || choices == "i" || choices == "") {
            this.menuInfo()
            return this.startMenu();
        } else if (!choices) {
            console.log(`${Style.Erreur}Choix invalide. Veuillez choisir vos aventuriers ${Style.Reset}`);
            return this.startMenu();
        } else {
            const adventurerIndex = choices.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 6);
            if (adventurerIndex.length !== 3) {
                console.log(`${Style.Erreur}Vous devez choisir exactement ${Style.Bold}3${Style.AfterNumberErreur} aventuriers parmi les options disponibles.${Style.Reset}\n`);
                return this.startMenu()
            }
            const selectedAdventurers :Character[] = adventurerIndex.map(index => new options[index - 1](options[index - 1].name));
            prompt(`Aventuriers sélectionnés : ${selectedAdventurers.map(character => Color.Blue+character.name+Style.Reset).join(", ")}. \n${Style.Italic}[Appuyez sur Entrée]${Style.Reset}\n`);
            return selectedAdventurers;
        }
    }
    static action = (currentFighter: Character, enemies: Monstre[], characters: Character[]): void => {
        let action: string | null;
        prompt(`\nC'est à ${Color.Blue}${currentFighter.name}${Style.Reset} de jouer. ${Color.Cyan}${currentFighter.currentHealth}/${currentFighter.maxHealth} PV${Style.Reset}\n${Style.Italic}[Appuyez sur Entrée]${Style.Reset}\n`);
    
        // Vérifie si l'attaquant a une attaque spéciale
        if (currentFighter instanceof Guerrier) {
            action = prompt(`Quelle action voulez vous effectuer?\n1: ${Color.BrightRed}Attaquer ${Style.Reset}(${currentFighter.physicalAttack} dégats) \n2: ${Color.Yellow}Utiliser un objet${Style.Reset} \n`);
            if (!action || !["1", "2", ""].includes(action)) {
                if (action === "") {
                    //console.log("nothing")
                }else{
                    console.log(`${Style.Erreur}Choix invalide. Veuillez choisir entre ${Style.Bold}1${Style.AfterNumberErreur} ou ${Style.Bold}2${Style.AfterNumberErreur}.${Style.Reset}\n`);
                    return this.action(currentFighter, enemies, characters);
                }
            }
        } else {
            action = prompt(`Quelle action voulez vous effectuer? \n1: ${Color.BrightRed}Attaquer ${Style.Reset}(${currentFighter.physicalAttack} dégats) \n2: ${Color.Yellow}Utiliser un objet${Style.Reset} \n3: ${Color.Magenta}Action Spéciale${Style.Reset} \n`);
            if (!action || !["1", "2", "3", ""].includes(action)) {
                if (action === "") {
                    //console.log("nothing")
                }else{
                    console.log(this.alert);
                    return this.action(currentFighter, enemies, characters);
                }
            }
        }
    
        const livingEnemies = enemies.filter(enemy => enemy.isAlive());
        const livingCharacters = characters.filter(character => character.isAlive());
        const deadCharacters = characters.filter(character => !character.isAlive());
    
        if (action === "1" || action === "") { // attaque classique
            let enemyList = `Choisissez l'ennemi à attaquer :\n`;
            livingEnemies.forEach((enemy, index) => {
                enemyList += ` ${index + 1}. ${Color.Red}${enemy.name}${Color.Cyan} ${enemy.currentHealth}/${enemy.maxHealth} PV${Style.Reset} \n`;
            });
            let index: number;
            let targetIndex: string|null = null;
            do{
                targetIndex = prompt(`${enemyList}-1. ${Color.Red}retour${Style.Reset} \n`);
                index = parseInt(targetIndex ?? "", 10) - 1;
                if (targetIndex === "-1") {
                    return this.action(currentFighter, livingEnemies, characters);
                }else if (index < 0 || index >= livingEnemies.length) {
                    console.log(this.alert);
                }
            }while(index < 0 || index >= livingEnemies.length && targetIndex !== "-1" && targetIndex !== "");
            if (targetIndex === "") {
                index = 0;
            }
            let confirm: string|null = null;
            do{confirm = prompt(`Veux-tu attaquer ${Color.Red}${livingEnemies[index].name}${Style.Reset}? [y,n]`);}
            while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
            if (confirm === "y" || confirm === "yes" || confirm === "") {
                const target = livingEnemies[index];
                prompt(`Vous avez choisi d'attaquer ${Color.Red}${target.name}${Style.Reset}. \n${Style.Italic}[Appuyez sur Entrée]${Style.Reset}\n`);
                prompt(`${currentFighter.attack(target)}`);
            } else{
                return this.action(currentFighter, livingEnemies, characters);
            }
        } else if (action === "3" && !(currentFighter instanceof Guerrier)) { // attack spécial
            if (currentFighter instanceof Pretre) {
                let characterList = `Choisissez un allié à ${Color.Green}soigner${Style.Reset} :\n`;
                livingCharacters.forEach((character, index) => {
                    characterList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset}\n `);
                let index = parseInt(targetIndex ?? "", 10);
                do{ 
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, characters);
                    }else if (index <= 0 && index > livingCharacters.length) {
                        console.log(this.alert);
                        targetIndex = prompt(`${characterList}-1. ${Color.Red}retour${Style.Reset}\n `);
                        index = parseInt(targetIndex ?? "", 10);
                    }
                }while(index <= 0 && index > livingCharacters.length && targetIndex !== "-1");

                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'action spéciale ${Color.Magenta}${currentFighter.specialAttackName}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingCharacters[index-1])}\n${Style.Italic}[Appuyez sur Entrée]${Style.Reset}\n`);
                } else{
                    return this.action(currentFighter, livingEnemies, characters);
                }
            } else if(currentFighter instanceof Paladin || currentFighter instanceof Barbare){
                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attaque spéciale ${Color.Magenta}${currentFighter.specialAttackName}${Style.Reset}? [y,n]\n`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingEnemies)}\n${Style.Italic}[Appuyez sur Entrée]${Style.Reset}\n`);
                } else{
                    return this.action(currentFighter, livingEnemies, characters);
                }
            }else{
                let ennemieslist = ""
                if(currentFighter instanceof Voleur){
                    ennemieslist = `Choisissez un ennemi à ${Color.Magenta}voler${Style.Reset} :\n`;
                }else{
                    ennemieslist = `Choisissez un ennemi à ${Color.Magenta}attaquer${Style.Reset} :\n`;
                }
                livingEnemies.forEach((character, index) => {
                    ennemieslist += `${index + 1}. ${Color.Red}${character.name}${Style.Reset}\n`;
                });
    
                let targetIndex = prompt(`${ennemieslist}-1. ${Color.Red}retour${Style.Reset}\n `);
                let index = parseInt(targetIndex ?? "", 10) - 1;
                while (index < 0 && index >= livingEnemies.length && targetIndex !== "-1" && targetIndex !== "") {
                    if (targetIndex === "-1") {
                        return this.action(currentFighter, livingEnemies, characters);
                    }else if (index < 0 && index >= livingEnemies.length) {
                        console.log(this.alert);
                        targetIndex = prompt(`${ennemieslist}-1. ${Color.Red}retour${Style.Reset}\n `);
                        index = parseInt(targetIndex ?? "", 10) - 1;
                    }
                }
                if (targetIndex === "") {
                    index = 0;
                }
                let confirm: string|null = null;
                do{confirm = prompt(`Veux-tu utiliser l'attack spéciale ${Color.Magenta}${currentFighter.specialAttackName}${Style.Reset} sur ${Color.Red}${livingEnemies[index].name}${Style.Reset}? [y,n]`);}
                while(confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");

                if (confirm === "y" || confirm === "yes" || confirm === "") {
                    prompt(`${currentFighter.specialAttack(livingEnemies[index])}`);
                } else{
                    return this.action(currentFighter, livingEnemies, characters);
                }
            }
        } else if (action === "2"){ //  utiliser l'inventaire
            if (bagage.inventaire.length === 0) {
                console.log("Vous n'avez plus d'objets, essayer d'en voler ou d'en collecter dans des coffres.");
                return this.action(currentFighter, livingEnemies, characters);
            } else {
                const itemNames = bagage.inventaire.map((item, index) => `${index + 1}. ${Color.Yellow}${item.name} ${Style.Reset}`).join("\n");
                const choice = prompt(`Choisissez l'objet à utiliser : \n${itemNames} \n -1. ${Color.Red}retour${Style.Reset}\n `);
                let itemIndex = parseInt(choice ?? "", 10) - 1;  // ?? vérifie que la valeur ne sois pas falsy sinon return "" et parsint le transforme en nombre de base 10
                if (choice === "-1") {
                    return this.action(currentFighter, enemies, characters);
                }
                if (choice === "") {
                    itemIndex = 0;
                }
                if (itemIndex >= 0 && itemIndex < bagage.inventaire.length) {
                    const selectedItem = bagage.inventaire[itemIndex];
                    prompt(`Objet choisi : ${Color.Yellow}${selectedItem.name}${Style.Reset}`);
                    
                    let userList = `Choisissez sur qui vous voulez utiliser ${Color.Yellow}${selectedItem.name}${Style.Reset} :\n`;
                    const possiblechoices: Character[]=[]

                    if (selectedItem.name === "Potion de soin" ) {
                        livingCharacters.filter(character => character.currentHealth != character.maxHealth).forEach((character, index) => {
                            userList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset} ${Color.BrightCyan}${character.currentHealth}/${character.maxHealth} PV${Style.Reset}\n`;
                        });
                        possiblechoices.push(...livingCharacters.filter(character => character.currentHealth != character.maxHealth))
                    } else if (selectedItem.name === "Demi-étoile" || selectedItem.name === "Morceau d'étoiles") {
                        livingCharacters.filter(character => character.currentHealth != character.maxHealth).forEach((character, index) => {
                            userList += `${index + 1}. ${Color.Blue}${character.name}${Style.Reset} ${Color.BrightCyan}${character.currentHealth}/${character.maxHealth} PV${Style.Reset}\n`;
                        });
                        deadCharacters.forEach((character, index) => {
                            userList += `${livingCharacters.filter(character => character.currentHealth != character.maxHealth).length + index + 1}. ${Color.Magenta}${character.name}${Style.Reset}\n`;
                        }); 
                        possiblechoices.push(...livingCharacters.filter(character => character.currentHealth != character.maxHealth), ...deadCharacters)
                    } else if (selectedItem.name === "Ether") {
                    livingCharacters.filter(character => character.currentMana != character.maxMana).forEach((character, index) => {
                        userList += `${index + 1}. ${Color.Blue}${character.name} ${Style.Reset} ${Color.BrightCyan}${character.currentHealth}/${character.maxHealth} PV ${character.currentMana} MP${Style.Reset}\n`;
                    });
                    possiblechoices.push(...livingCharacters.filter(character => character.currentMana != character.maxMana))
                    }  
                    if (possiblechoices.length == 0){
                        console.log("Vous ne pouvez pas utiliser cet item, car personne n'en à besoin.");
                        return this.action(currentFighter, livingEnemies, characters);
                    }    
                    let targetIndex :string|null
                    let index :number = 0
                
                    do {
                        targetIndex = prompt(`${userList}-1. ${Color.Red}retour${Style.Reset}\n `);
                        if (targetIndex === "-1") {
                            return this.action(currentFighter, livingEnemies, characters);
                        }else if(targetIndex === ""){
                            index = 0
                        }else{
                            index = parseInt(targetIndex ?? "", 10) - 1;
                            if(index < 0 || index >= possiblechoices.length) {
                                console.log(this.alert);
                            }
                        }
                    } while ((index < 0 || index >= possiblechoices.length) && targetIndex !== "-1" && targetIndex !== "");
                
                    const target = possiblechoices[index] ?? possiblechoices[0];
                    let confirm: string | null = null;
                
                    do {
                        confirm = prompt(`Veux-tu utiliser la potion ${Color.Yellow}${selectedItem.name}${Style.Reset} sur ${Color.Blue}${target.name}${Style.Reset} ? [y,n]\n`);
                    }while (confirm !== "y" && confirm !== "n" && confirm !== "yes" && confirm !== "non" && confirm !== "");
                    if (confirm === "y" || confirm === "yes" || confirm === "") {
                        prompt(`${bagage.inventaire[itemIndex].use(target)}`);
                        bagage.inventaire.splice(itemIndex, 1);
                    } else {
                        return this.action(currentFighter, livingEnemies, characters);
                    }                
                } 
            }               
        }
    }
}