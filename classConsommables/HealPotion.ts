import Character from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class HealPotion extends Consommable{

    constructor(){
        super("Potion de soin", 50, 0, 0, 0, 0)
    }

    use(target :Character){
        target.heal(this.regenLife)
    }
}