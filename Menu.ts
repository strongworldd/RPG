import { Character } from "./classCharacters/Character.ts";
import { Guerrier } from "./classCharacters/Guerrier.ts";
import { Pretre } from "./classCharacters/Pretre.ts";
import { Paladin } from "./classCharacters/paladin.ts";
import { Mage } from "./classCharacters/mage.ts";
import { Barbare } from "./classCharacters/barbare.ts";
import { Monstre } from "./classCharacters/classMonstres/Monstre.ts";
import { Voleur } from "./classCharacters/Voleur.ts";

export class Menu{
        startMenu(): Character[] {
            const options = [Guerrier, Mage, Paladin, Barbare, Pretre, Voleur];
            const choices = prompt("Choisissez 3 aventuriers parmi les 6 disponibles \n Guerrier: 1 \n Mage: 2 \n Paladin: 3 \n Barbare: 4 \n Prêtre: 5 \n Voleur: 6\n Entrez trois numéros séparés par des virgules (ex : 1,2,3)");
    
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
    
    action = (currentFighter: Character, enemies: Monstre[]): void => {
        console.log(`C'est à ${currentFighter.name} de jouer.`)
        const action = prompt("Quelle action voulez vous effectuer? \n Attaquer: 1 \n Action Spéciale: 2 \n Utiliser un object: 3 \n ");
        if (!action || !["1", "2", "3"].includes(action)) {
            alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
            return this.action(currentFighter,enemies);
        }

        let target: Monstre | null = null;

        if (action === "1"){
            const livingEnemies = enemies.filter(enemy => enemy.isAlive());

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
            console.log(currentFighter.attack(target))

        } else if (action === "2") {
            
            const specialattack = prompt("Choisissez une action spéciale");
            const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(currentFighter));
            console.log(methodNames[1])
            console.log("Action spéciale choisie :", specialattack);

        } else {
            const item = prompt("Choisissez l'objet à utiliser");
            console.log("Objet choisi :", item);
        }
    }
}