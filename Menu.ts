import { Character } from "./classCharacters/Character.ts";
import { Guerrier } from "./classCharacters/Guerrier.ts";
import { Pretre } from "./classCharacters/Pretre.ts";
import { Paladin } from "./classCharacters/Paladin.ts";
import { Mage } from "./classCharacters/Mage.ts";
import { Barbare } from "./classCharacters/Barbare.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Voleur } from "./classCharacters/Voleur.ts";

export class Menu{
        startMenu(): Character[] {
            const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur];
            const choices = prompt("Choisissez 3 aventuriers parmi les 6 disponibles \n Guerrier: 1 \n Mage: 2 \n Paladin: 3 \n Barbare: 4 \n Prêtre: 5 \n Voleur: 6\n Entrez trois numéros séparés par des virgules (ex : 1,2,3) \n");
    
            if (!choices) return this.startMenu();
    
            const adventurerIndex = choices.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 6);
    
            if (adventurerIndex.length !== 3) {
                alert("Vous devez choisir exactement 3 aventuriers parmi les options disponibles.");
                return this.startMenu();
            }
    
            const selectedAdventurers :Character[] = adventurerIndex.map(index => new options[index - 1](options[index - 1].name));

            console.log("Aventuriers sélectionnés :", selectedAdventurers.map(character => character.name));
    
            return selectedAdventurers;
        }
    
        action = (currentFighter: Character, enemies: Monstre[], characters: Character[]): void => {
            const methodCount = Object.getOwnPropertyNames(Object.getPrototypeOf(currentFighter));
            let action: string | null;
            console.log(`C'est à ${currentFighter.name} de jouer.`);
        
            // Vérifier si l'attaquant a une attaque spéciale
            if (methodCount.length > 1) {
                action = prompt("Quelle action voulez vous effectuer? \n Attaquer: 1 \n Action Spéciale: 2 \n Utiliser un objet: 3 \n");
                if (!action || !["1", "2", "3"].includes(action)) {
                    alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
                    return this.action(currentFighter, enemies, characters);
                }
            } else {
                action = prompt("Quelle action voulez vous effectuer? \n Attaquer: 1 \n Utiliser un objet: 2 \n");
                if (!action || !["1", "2"].includes(action)) {
                    alert("Choix invalide. Veuillez choisir entre 1 ou 2.");
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
                    enemyList += `${index + 1}. ${enemy.name}\n`;
                });
        
                let targetIndex = prompt(enemyList);
                while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                    alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
                    targetIndex = prompt(enemyList);
                }
        
                target = livingEnemies[parseInt(targetIndex) - 1];
                console.log(`Vous avez choisi d'attaquer ${target.name}.`);
                console.log(currentFighter.attack(target));
        
            } else if (action === "2" && methodCount.length > 1) {
                if (methodCount[1] === "specialheal") {
                    let characterList = "Choisissez un allié à soigner :\n";
                    livingCharacters.forEach((character, index) => {
                        characterList += `${index + 1}. ${character.name}\n`;
                    });
        
                    let targetIndex = prompt(characterList);
                    while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                        alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
                        targetIndex = prompt(characterList);
                    }
        
                    targetCharacter = livingCharacters[parseInt(targetIndex) - 1];
                    currentFighter.attack(targetCharacter, methodCount[1]);
                } else {
                    let enemyList = "Choisissez l'ennemi à attaquer :\n";
                    livingEnemies.forEach((enemy, index) => {
                        enemyList += `${index + 1}. ${enemy.name}\n`;
                    });
        
                    let targetIndex = prompt(enemyList);
                    while (targetIndex !== "1" && targetIndex !== "2" && targetIndex !== "3") {
                        alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
                        targetIndex = prompt(enemyList);
                    }
        
                    target = livingEnemies[parseInt(targetIndex) - 1];
                    const confirm = prompt(`Veux-tu utiliser l'action spéciale ${methodCount[1]}? [y,n]`);
        
                    if (confirm === "y" || confirm === "yes") {
                        console.log(currentFighter.attack(target, methodCount[1]));
                    } else {
                        return this.action(currentFighter, enemies, characters);
                    }
                }
            } else{
                const item = prompt("Choisissez l'objet à utiliser");
                console.log("Objet choisi :", item);
            }
        }
        
}
