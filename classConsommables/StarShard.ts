import {Character} from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class StarShard extends Consommable{

    constructor(){
        super("Morceau d'étoiles", 0, 0, 0, 0, 0)
    }

    use(target :Character){
        if (target.isAlive()) {
            target.heal(50)
        }else{
            target.revive(20)
        }
    }
}