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
        return `${Color.Blue}Voleur${Style.Reset}   - ${Color.BrightRed}Attaque Physique: 20${Style.Reset} - ${Color.Green}Défense: 5${Style.Reset} - ${Color.BrightMagenta}Vitesse: 8${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale: ${Style.Reset}Vole un objet : 40% de chances de ne rien voler, 30% d'obtenir une potion, 15% d'obtenir un fragment d'étoile, 10% d'obtenir un éther et 5% d'obtenir une demi-étoile.\n${Color.LightPurple}Compétence secrète: ${Color.Violet}Inconnue${Style.Reset}.`;
    }

    override specialAttack(target :Character){
        if (target.currentHealth < 10) {
        bagage.add(new HalfStar());
        return `${Color.Blue}${this.name}${Style.Reset} a voler une ${Color.Yellow}demi-étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset} car il est gravement affaibli.`;
    }

        const chance = Math.random()*100
        if (chance < 40) {
            return `${Color.Blue}${this.name}${Style.Reset} n'a rien voler à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 70) {
            bagage.add(new HealPotion())
            return `${Color.Blue}${this.name}${Style.Reset} a voler une ${Color.Yellow}potion de soin${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 85) {
            bagage.add(new StarShard())
            return `${Color.Blue}${this.name}${Style.Reset} a voler un ${Color.Yellow}fragement d'étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 95) {
            bagage.add(new Ether())
            return `${Color.Blue}${this.name}${Style.Reset} a voler un ${Color.Yellow}ether${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else {
            bagage.add(new HalfStar())
            return `${Color.Blue}${this.name}${Style.Reset} a voler une ${Color.Yellow}demi-étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        }
    }
}