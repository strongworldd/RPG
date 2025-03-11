import Character from "../classCharacters/Character.ts";
import { Consommable } from "./Consommable.ts";

export class Ether extends Consommable{
    constructor(){
        super("Ether", 0, 30, 0, 0, 0)
    }

    use(target :Character){
        target.regenMana(this.regenMana)
    }
}