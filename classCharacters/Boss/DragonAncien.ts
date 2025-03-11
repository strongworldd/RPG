import { Monstre } from "../Monstre.ts";
import { Character } from "../Character.ts";

export class DragonAncien extends Monstre {
    constructor() {
        super("Dragon Ancien", 500, 50);
    }

    agir(aventuriers: Character[]): void {
        console.log(`${this.name} rugit, intimidant ses ennemis et réduisant leur attaque !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.physicalAttack = Math.max(1, aventurier.physicalAttack - 10);
            }
        });

        console.log(`${this.name} souffle des flammes sur tout le groupe !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.currentHealth -= 40;
                console.log(`${aventurier.name} subit 40 dégâts ! Il lui reste ${aventurier.currentHealth} HP.`);
                if (aventurier.currentHealth <= 0) {
                    console.log(`${aventurier.name} est mort !`);
                }
            }
        });
    }
}