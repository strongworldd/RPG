import Character from "./Character.ts";

export class Mage extends Character{

    override maxMana = 100
    override currentMana = 100
    override magicAttack = 25
    
    constructor(name :string) {
        super(name, 10, 2, 8, 100, 100)
    }

    sorcererAttack(target :Character){
        this.attack(target)
        this.currentMana -= 25
        return `${this.name} à fait ${this.magicAttack} dégats à ${target.name}. ${this.name} n'as plus que ${this.currentMana} mana, ${target.name} n'as plus que ${target.currentHealth} point de vie.`
    }
}