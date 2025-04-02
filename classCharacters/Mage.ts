import { Character } from "./Character.ts";
import { Color, Style } from "../Color.ts";

export class Mage extends Character{

    override maxMana = 100
    override currentMana = 100
    override magicAttack = 100
    override specialAttackName = "sorcererAttack"

    constructor(name :string) {
        super(name, 10, 2, 4, 100, 100)
    }

    static override displayInfo(): string {
        return `${Color.Blue}Mage${Style.Reset}     - ${Color.BrightRed}Attaque Physique: 10${Style.Reset} - ${Color.Green}Défense: 2${Style.Reset} - ${Color.BrightMagenta}Vitesse: 4${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset} - ${Color.Yellow}Mana Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale :${Style.Reset} Attaque magique qui consomme du Mana qui fait 100 dégats, mais ignore la défense ennemie.`;
}

    override specialAttack(target :Character){
        this.attack(target, "sorcererAttack")
        this.currentMana -= 50
        return `${Color.Blue}${this.name}${Style.Reset} à fait ${this.magicAttack} dégats à ${Color.Red}${target.name}${Style.Reset}. ${Color.Blue}${this.name}${Style.Reset} n'a plus que ${this.currentMana} mana, ${Color.Red}${target.name}${Style.Reset} n'a plus que ${target.currentHealth} points de vie.`
    }
}
