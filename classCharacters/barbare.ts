import { Color, Style } from "../Color.ts";
import { Character } from "./Character.ts";
import { Monstre } from "./classMonstres/Monstre.ts";

export class Barbare extends Character {

    override specialAttackName = "berserkAttack"

    constructor(name :string) {
        super(name, 30, 3, 6, 100, 100)
    }

    static override displayInfo(): string {
        return `${Color.Blue}Barbare${Style.Reset}  - ${Color.BrightRed}Attaque Physique: 30${Style.Reset} - ${Color.Green}Défense: 3${Style.Reset} - ${Color.BrightMagenta}Vitesse: 6${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale :${Style.Reset} Attaque un ennemi au hasard pour 130% des dégats physiques normaux (attaque - défense adverse)*1.3, mais il se blessera de 20% de sa vie.`;
}

    override specialAttack(target :Monstre | Monstre[]){
        if (Array.isArray(target)) {
            const cible = Math.floor(Math.random() * (target.length - 0 + 1)) + 0;
            return `${this.attack(target[cible], "berserkAttack")}. \n${this.hurt(this.maxHealth*0.2)} ${Color.Blue}${this.name}${Style.Reset} n'a plus que ${this.currentHealth} points de vie.`;
        }else{
            return `${this.attack(target, "berserkAttack")}. \n${this.hurt(this.maxHealth*0.2)} ${Color.Blue}${this.name}${Style.Reset} n'a plus que ${this.currentHealth} points de vie.`
        }
    }
}