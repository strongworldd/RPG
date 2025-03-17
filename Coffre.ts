import { Consommable } from "./classConsommables/Consommable.ts";
import { Ether } from "./classConsommables/Ether.ts";
import { HealPotion } from "./classConsommables/HealPotion.ts";
import { StarShard } from "./classConsommables/StarShard.ts";
import { HalfStar } from "./classConsommables/HalfStar.ts";
import { Inventaire } from "./Inventaire.ts";
import { Character } from "./classCharacters/Character.ts";

export class Coffre {
    items: Consommable[];

    constructor() {
        this.items = [
            new HealPotion(),
            new Ether(),
            new StarShard(),
            new HalfStar()
        ];
    }

    open(inventaire: Inventaire, joueur: Character): Consommable[] {
        const random = Math.random();
        if (random < 0.7) { 
            const droppedItems: Consommable[] = [];
            for (let i = 0; i < 2; i++) {
                const randomIndex = Math.floor(Math.random() * this.items.length);
                const item = this.items[randomIndex];
                droppedItems.push(item);
                inventaire.add(item);
            }
            console.log("Vous avez ouvert le coffre et trouvé les objets suivants :");
            droppedItems.forEach(item => console.log(item.name));
            return droppedItems;
        } else { 
            const damage = 20; 
            joueur.currentHealth -= damage;
            console.log(`Le coffre était piégé ! ${joueur.name} subit ${damage} dégâts. Il lui reste ${joueur.currentHealth} HP.`);
            return [];
        }
    }
}