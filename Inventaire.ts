import { Consommable } from "./classConsommables/Consommable.ts";
import { Ether } from "./classConsommables/Ether.ts";
import { HealPotion } from "./classConsommables/HealPotion.ts";
import { StarShard } from "./classConsommables/StarShard.ts";

export class Inventaire{
    inventaire :Consommable[] = [new HealPotion(), new HealPotion(), new Ether(), new StarShard()]

    add(item :Consommable){
        this.inventaire.push(item)
    }

     remove(item :Consommable){
        const indexOfElementToRemove = this.inventaire.findIndex(i => i === item)
        if (indexOfElementToRemove !== -1) {
            this.inventaire.splice(indexOfElementToRemove, 1)
        }
    }
}