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

    override specialAttack(target :Character){
        this.attack(target, "sorcererAttack")
        this.currentMana -= 25
        return `${Color.Blue}${this.name}${Style.Reset} à fait ${this.magicAttack} dégats à ${Color.Red}${target.name}${Style.Reset}. ${Color.Blue}${this.name}${Style.Reset} n'as plus que ${this.currentMana} mana, ${Color.Red}${target.name}${Style.Reset} n'as plus que ${target.currentHealth} points de vie.`
    }
}
