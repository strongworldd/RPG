import {Character} from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class HalfStar extends Consommable{
    constructor(){
        super("Demi-étoile", 100, 0, 0, 0, 0)
    }

    use(target :Character){
        if (target.isAlive()) {
            target.heal(this.regenLife)
        }else{
            target.revive(this.regenLife)
        }
    }
}