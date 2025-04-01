import { Consommable } from "./classConsommables/Consommable.ts";
import { Ether } from "./classConsommables/Ether.ts";
import { HealPotion } from "./classConsommables/HealPotion.ts";
import { StarShard } from "./classConsommables/StarShard.ts";
import { HalfStar } from "./classConsommables/HalfStar.ts";
import { Inventaire } from "./Inventaire.ts";
import { Character } from "./classCharacters/Character.ts";
import { Color, Style } from "./Color.ts";

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
            droppedItems.forEach(item => prompt(Color.Yellow+item.name+Style.Reset));
            return droppedItems;
        } else { 
            const damage = 20; 
            joueur.currentHealth -= damage;
            prompt(`Le coffre était piégé ! ${Color.Blue}${joueur.name}${Style.Reset} subit ${damage} dégâts. Il lui reste ${Color.Cyan}${joueur.currentHealth}/${joueur.maxHealth} points de vie${Style.Reset}.`);
            return [];
        }
    }
}