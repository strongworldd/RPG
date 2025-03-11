import { Monstre } from "../Monstre.ts";
import { Character } from "../Character.ts";

export class TitanCorrompu extends Monstre {
    constructor() {
        super("Titan Corrompu", 600, 40);
    }

    agir(aventuriers: Character[]): void {
        console.log(`${this.name} frappe le sol, créant une onde de choc qui déséquilibre ses ennemis !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.speed = Math.max(1, aventurier.speed - 3);
                console.log(`${aventurier.name} est déséquilibré et perd 3 points de vitesse ! Nouvelle vitesse : ${aventurier.speed}`);
            }
        });

        console.log(`${this.name} concentre son énergie sombre et libère un coup titanesque sur le plus fort !`);
        const cible = aventuriers.reduce((prev, curr) => (prev.physicalAttack > curr.physicalAttack ? prev : curr));
        if (cible.isAlive()) {
            cible.currentHealth -= 60;
            console.log(`${cible.name} subit un coup titanesque de 60 dégâts ! Il lui reste ${cible.currentHealth} HP.`);
            if (cible.currentHealth <= 0) {
                console.log(`${cible.name} est écrasé sous la force du Titan Corrompu !`);
            }
        }
    }
}