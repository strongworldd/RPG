import { Character } from "./Character.ts";

export class Paladin extends Character {

    override specialAttackName = "divinAttack"
    
    constructor(name :string) {
        super(name, 20, 8, 7, 100, 100)
    }

    static override displayInfo(): string {
        return "Paladin - Attaque Physique: 20 - Défense: 8 - Vitesse: 7 - PV Max: 100";
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