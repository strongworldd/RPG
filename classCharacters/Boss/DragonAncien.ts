import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";
export class DragonAncien extends Monstre {
    constructor() {
        super("Dragon Ancien", 200, 50, 10);
    }

    agir(aventuriers: Character[]): void {
        const random = Math.random();
        if (random < 0.7) {
            // 70% chance
            const cible = super.act(aventuriers);
            if (cible) {
                console.log(`${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} !`);
            }
        } else {
            // 30% chance
        console.log(`${Color.Red}${this.name}${Style.Reset} rugit, intimidant ses ennemis et réduisant leur attaque !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.physicalAttack = Math.max(1, aventurier.physicalAttack - 10);
            }
        });

        console.log(`${Color.Red}${this.name}${Style.Reset} souffle des flammes sur tout le groupe !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.currentHealth -= 40;
                console.log(`${Color.Blue}${aventurier.name}${Style.Reset} subit 40 dégâts ! Il lui reste ${aventurier.currentHealth} HP.`);
                if (aventurier.currentHealth <= 0) {
                    console.log(`${Color.Blue}${aventurier.name}${Style.Reset} est mort !`);
                }
            }
        });
    }
}
}