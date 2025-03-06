import Character from "./Character.ts";

export class Mage extends Character{

    override maxMana = 100
    override currentMana = 100
    override magicAttack = 25
    
    constructor(name :string, speed :number) {
        super(name, 10, 10, speed, 100, 100)
    }

    attackMagique(target :Character){
        target.hurt(this.magicAttack)
        this.currentMana -= 25
        return `${this.name} à fait ${this.magicAttack} dégats à ${target.name}. ${this.name} n'as plus que ${this.currentMana} mana, ${target.name} n'as plus que ${target.currentHealth} point de vie.`
    }
}