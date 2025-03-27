import { Ether } from "../classConsommables/Ether.ts";
import { HalfStar } from "../classConsommables/HalfStar.ts";
import { HealPotion } from "../classConsommables/HealPotion.ts";
import { StarShard } from "../classConsommables/StarShard.ts";
import { bagage } from "../GameManagerTest.ts";
import { Character } from "./Character.ts";
import { Color, Style } from "../Color.ts";

export class Voleur extends Character{

    override specialAttackName = "robbery"

    constructor(name :string) {
        super(name, 20, 5, 8, 100, 100)
    }

    static override displayInfo(): string {
        return "Voleur - Attaque Physique: 20 - Défense: 5 - Vitesse: 8 - PV Max: 100";
}

    override specialAttack(target :Character){
        const chance = Math.random()*100
        if (chance < 40) {
            return `${Color.Blue}${this.name}${Style.Reset} n'a rien voler à ${Color.Red}${target.name}${Style.Reset}`;
        } else if (chance < 70) {
            bagage.add(new HealPotion())
            return `${Color.Blue}${this.name}${Style.Reset} a voler une potion de soin à ${Color.Red}${target.name}${Style.Reset}`;
        } else if (chance < 85) {
            bagage.add(new StarShard())
            return `${Color.Blue}${this.name}${Style.Reset} a voler un fragement d'étoile à ${Color.Red}${target.name}${Style.Reset}`;
        } else if (chance < 95) {
            bagage.add(new Ether())
            return `${Color.Blue}${this.name}${Style.Reset} a voler un ether à ${Color.Red}${target.name}${Style.Reset}`;
        } else {
            bagage.add(new HalfStar())
            return `${Color.Blue}${this.name}${Style.Reset} a voler une demi-étoile à ${Color.Red}${target.name}${Style.Reset}`;
        }
    }
}