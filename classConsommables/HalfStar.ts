import {Character} from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class HalfStar extends Consommable{
    constructor(){
        super("Demi-étoile", 100, 0, 0, 0, 0)
    }

    override use(target :Character){
        if (target.isAlive()) {
            return target.heal(this.regenLife)
        }else{
            return target.revive(this.regenLife)
        }
    }
}