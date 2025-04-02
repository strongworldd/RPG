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
        return `${Color.Blue}Voleur${Style.Reset}   - ${Color.BrightRed}Attaque Physique: 20${Style.Reset} - ${Color.Green}Défense: 5${Style.Reset} - ${Color.BrightMagenta}Vitesse: 8${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale: ${Style.Reset}Vole un objet : 40% de chances de ne rien voler, 30% d'obtenir une potion, 15% d'obtenir un fragment d'étoile, 10% d'obtenir un éther et 5% d'obtenir une demi-étoile.`;
    }

    override specialAttack(target: Character): string {
        // Vérifier si la cible a 10 PV ou moins
        if (target.currentHealth < 10) {
            bagage.add(new HalfStar());
            return `${Color.Blue}${this.name}${Style.Reset} a volé une ${Color.Yellow}demi-étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset} car il est gravement affaibli.`;
        }

        const healthPercentage = (target.currentHealth / target.maxHealth) * 100;
        const chance = Math.random() * 100;
        const rareBoost = 100 - healthPercentage;
        const commonBoost = healthPercentage;

        if (chance < 40 + commonBoost * 0.3) {
            return `${Color.Blue}${this.name}${Style.Reset} n'a rien volé à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 70 + commonBoost * 0.2) {
            bagage.add(new HealPotion());
            return `${Color.Blue}${this.name}${Style.Reset} a volé une ${Color.Yellow}potion de soin${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 85 + rareBoost * 0.2) {
            bagage.add(new StarShard());
            return `${Color.Blue}${this.name}${Style.Reset} a volé un ${Color.Yellow}fragment d'étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else if (chance < 95 + rareBoost * 0.1) {
            bagage.add(new Ether());
            return `${Color.Blue}${this.name}${Style.Reset} a volé un ${Color.Yellow}éther${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        } else {
            bagage.add(new HalfStar());
            return `${Color.Blue}${this.name}${Style.Reset} a volé une ${Color.Yellow}demi-étoile${Style.Reset} à ${Color.Red}${target.name}${Style.Reset}.`;
        }
    }
}