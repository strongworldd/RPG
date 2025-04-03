import {Character} from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class Ether extends Consommable{
    constructor(){
        super("Ether", 0, 50, 0, 0, 0)
    }

    override use(target :Character){
        return target.regenMana(this.regenMana)
    }
}