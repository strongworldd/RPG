import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class LicheSombre extends Monstre {
    constructor() {
        super("Liche Sombre", 175, 30, 10, 10);
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
        console.log(`${Color.Red}${this.name}${Style.Reset} invoque une aura de terreur, drainant la vitalité de ses ennemis !`);
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.currentHealth -= 20;
                this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 10); // Se régénère avec le drain
                console.log(`${Color.Blue}${aventurier.name}${Style.Reset}} subit 20 dégâts ! Il lui reste ${aventurier.currentHealth} HP.`);
            }
        });

        console.log(`${Color.Red}${this.name}${Style.Reset} lance un sort maudit sur l'ennemi le plus faible !`);
        const cible = aventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        if (cible.isAlive()) {
            cible.currentHealth -= 50;
            console.log(`${Color.Blue}${cible.name}${Style.Reset} est frappé par une malédiction et subit 50 dégâts ! Il lui reste ${cible.currentHealth} HP.`);
            if (cible.currentHealth <= 0) {
                console.log(`${Color.Blue}${cible.name}${Style.Reset} succombe à la malédiction !`);
            }
        }
    }
}
}