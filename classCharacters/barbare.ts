import Character from "./Character.ts";

export class Barbare extends Character {
    constructor(name :string, speed :number) {
        super(name, 30, 3, speed, 100, 100)
    }

    berserkAttack(target :Character | Character[]){
        if (target !instanceof Character) {
            
        }
        for (const cible of target) {
            
        }
    }
}