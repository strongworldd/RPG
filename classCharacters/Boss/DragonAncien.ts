import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
export class DragonAncien extends Monstre {
    constructor() {
        super("Dragon Ancien", 500, 50);
    }

    agir(aventuriers: Character[]): void {
        const random = Math.random();
        if (random < 0.7) {
            // 70% chance
            const cible = super.act(aventuriers);
            if (cible) {
                console.log(`${this.name} attaque ${cible.name} !`);
            }
        } else {
            // 30% chance
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
}