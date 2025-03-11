import {Character} from "./Character.ts";

export class Barbare extends Character {
    constructor(name :string) {
        super(name, 30, 3, 6, 100, 100)
    }

    berserkAttack(target :Character | Character[]){
        if (Array.isArray(target)) {
            const cible = Math.floor(Math.random() * (target.length - 0 + 1)) + 0;
            this.attack(target[cible])
        }else{
            this.attack(target)
        }
        this.hurt(this.maxHealth*0.2)
    }
}