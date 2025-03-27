import { Character } from "./Character.ts";
import { Color, Style } from "../Color.ts";

export class Mage extends Character{

    override maxMana = 100
    override currentMana = 100
    override magicAttack = 25
    override specialAttackName = "sorcererAttack"

    constructor(name :string) {
        super(name, 10, 2, 4, 100, 100)
    }

    static override displayInfo(): string {
        return "Mage - Attaque Physique: 10 - Défense: 2 - Vitesse: 4 - PV Max: 100 - Mana Max: 100";
}

    override specialAttack(target :Character){
        this.attack(target, "sorcererAttack")
        this.currentMana -= 25
        return `${Color.Blue}${this.name}${Style.Reset} à fait ${this.magicAttack} dégats à ${Color.Red}${target.name}${Style.Reset}. ${Color.Blue}${this.name}${Style.Reset} n'a plus que ${this.currentMana} mana, ${Color.Red}${target.name}${Style.Reset} n'a plus que ${target.currentHealth} points de vie.`
    }
}
