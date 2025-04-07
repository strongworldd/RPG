import { Character } from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class StarShard extends Consommable{

    constructor(){
        super("Morceau d'étoile", 0, 0, 0, 0, 0)
    }

    override use(target :Character){
        if (target.isAlive()) {
            return target.heal(50)
        }else{
            return target.revive(20)
        }
    }
}