import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class TitanCorrompu extends Monstre {
    constructor() {
        super("Titan Corrompu", 200, 40, 10);
    }

    agir(aventuriers: Character[]): void {
        const random = Math.random();
        if (random < 0.7) {
            const cible = super.act(aventuriers);
            if (cible) {
                console.log(`${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} !`);
            }
        } else {
        console.log(`${Color.Red}${this.name}${Style.Reset} frappe le sol, créant une onde de choc qui déséquilibre ses ennemis !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.speed = Math.max(1, aventurier.speed - 3);
                console.log(`${Color.Blue}${aventurier.name}${Style.Reset} est déséquilibré et perd 3 points de vitesse ! Nouvelle vitesse : ${aventurier.speed}`);
            }
        });

        console.log(`${Color.Red}${this.name}${Style.Reset} concentre son énergie sombre et libère un coup titanesque sur le plus fort !`);
        const cible = aventuriers.reduce((prev, curr) => (prev.physicalAttack > curr.physicalAttack ? prev : curr));
        if (cible.isAlive()) {
            cible.currentHealth -= 60;
            console.log(`${Color.Blue}${cible.name}${Style.Reset} subit un coup titanesque de 60 dégâts ! Il lui reste ${cible.currentHealth} HP.`);
            if (cible.currentHealth <= 0) {
                console.log(`${Color.Blue}${cible.name}${Style.Reset} est écrasé sous la force du Titan Corrompu !`);
            }
        }
    }
}
}