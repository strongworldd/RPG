import { Character } from "./Character.ts";

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
        return `${this.name} à fait ${this.magicAttack} dégats à ${target.name}. ${this.name} n'as plus que ${this.currentMana} mana, ${target.name} n'as plus que ${target.currentHealth} points de vie.`
    }
}
