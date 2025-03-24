import { Color, Style } from "../Color.ts";
import { Character } from "./Character.ts";
import { Monstre } from "./classMonstres/Monstre.ts";

export class Barbare extends Character {

    override specialAttackName = "berserkAttack"

    constructor(name :string) {
        super(name, 30, 3, 6, 100, 100)
    }

    override specialAttack(target :Monstre | Monstre[]){
        if (Array.isArray(target)) {
            const cible = Math.floor(Math.random() * (target.length - 0 + 1)) + 0;
            return `${this.attack(target[cible], "berserkAttack")}. ${this.hurt(this.maxHealth*0.2)}, ${Color.Blue}${this.name}${Color.Reset} n'a plus que ${this.currentHealth} points de vie.`;
            
        }else{
            return `${this.attack(target, "berserkAttack")}. ${this.hurt(this.maxHealth*0.2)}, ${Color.Blue}${this.name}${Style.Reset} n'a plus que ${this.currentHealth} points de vie.`
        }
    }
}