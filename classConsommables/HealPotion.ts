import {Character} from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class HealPotion extends Consommable{

    constructor(){
        super("Potion de soin", 50, 0, 0, 0, 0)
    }


    override use(target :Character){
        return target.heal(this.regenLife)
    }
}