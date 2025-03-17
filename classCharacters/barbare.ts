import { Character } from "./Character.ts";

export class Barbare extends Character {

    override specialAttackName = "berserkAttack"

    constructor(name :string) {
        super(name, 30, 3, 6, 100, 100)
    }

    override specialAttack(target :Character | Character[]){
        if (Array.isArray(target)) {
            const cible = Math.floor(Math.random() * (target.length - 0 + 1)) + 0;
            this.attack(target[cible], "berserkAttack")
        }else{
            this.attack(target, "berserkAttack")
        }
        this.hurt(this.maxHealth*0.2)
    }
}