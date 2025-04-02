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
        return `${Color.Blue}Mage${Style.Reset}     - ${Color.BrightRed}Attaque Physique: 10${Style.Reset} - ${Color.Green}Défense: 2${Style.Reset} - ${Color.BrightMagenta}Vitesse: 4${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset} - ${Color.BrightBlue}Mana Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale:${Style.Reset} Attaque magique qui consomme du Mana qui fait 100 dégats, et ignore la défense ennemie.`;
}

    override specialAttack(target :Character){
        this.currentMana -= 50
        
        
        return this.attack(target, "sorcererAttack") + `\n${Color.Blue}${this.name}${Style.Reset} n'a plus que ${Color.BrightBlue}${this.currentMana}/${this.maxMana} mana${Style.Reset}.`
    }
}
