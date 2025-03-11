import {Character} from "./Character.ts";

export class Paladin extends Character {
    constructor(name :string) {
        super(name, 20, 8, 7, 100, 100)
    }

    divinAttack(target :Character | Character[]){
        if (Array.isArray(target)) {
            target.forEach(cible => {
                this.attack(cible, "divinAttack")
            });
        }else{
            this.attack(target, "divinAttack")
        }
        
    }
}