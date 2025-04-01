import { Character } from "./Character.ts";
import { Color, Style } from "../Color.ts";

export class Paladin extends Character {

    override specialAttackName = "divinAttack"
    
    constructor(name :string) {
        super(name, 20, 8, 7, 100, 100)
    }

    static override displayInfo(): string {
        return `${Color.Blue}Paladin${Style.Reset}  - ${Color.BrightRed}Attaque Physique: 20${Style.Reset} - ${Color.Green}Défense: 8${Style.Reset} - ${Color.BrightMagenta}Vitesse: 7${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale:${Style.Reset} Cible tous les ennemis, leur infligeant 40% des dégats d'une attaque physique`;
}

    override specialAttack(target :Character | Character[]){
        let res = ""
        console.log("Attaque divine du paladin !")
        if (Array.isArray(target)) {
            target.forEach(cible => {
                res += `${this.attack(cible, "divinAttack")}\n`
            });
        }else{
            res = this.attack(target, "divinAttack")
        }
        return res
    }
}