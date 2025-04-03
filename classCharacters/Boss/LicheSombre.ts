import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class LicheSombre extends Monstre {
    constructor() {
        super("Liche Sombre", 175, 30, 10);
    }

    override attackMonstre = (_cible: Character):string=>{return "nothing"}

    override attackBoss = (aventuriers :Character[]): string => {
        let cible
        let text = ""
        const random = Math.random();
        if (random < 0.2) {
            cible = aventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        } else {
            const index = Math.floor(Math.random() * aventuriers.length);
            cible = aventuriers[index];
        }

        const random2 = Math.random();
        if (random2 < 0.7) {
            return `${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset}.\n` + this.attack(cible);
        } else {
            text += `${Color.Red}${this.name}${Style.Reset} invoque une aura de terreur, drainant la vitalité de ses ennemis !\n`;
            aventuriers.forEach(aventurier => {
                if (aventurier.isAlive()) {
                    aventurier.currentHealth -= 20;
                    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 10); // Se régénère avec le drain
                    text += `${Color.Blue}${aventurier.name}${Style.Reset} subit 20 dégâts ! Il ne lui reste plus que ${Color.Cyan}${aventurier.currentHealth}/${aventurier.maxHealth} points de vie${Style.Reset}.\n`;
                }
            });

            text += `${Color.Red}${this.name}${Style.Reset} lance un sort maudit sur l'ennemi le plus faible !\n`;
            const cible = aventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
            if (cible.isAlive()) {
                cible.currentHealth -= 50;
                if (cible.currentHealth <= 0) {
                    text += `${Color.Blue}${cible.name}${Style.Reset} succombe à la malédiction !\n`;
                }else{
                    text += `${Color.Blue}${cible.name}${Style.Reset} est frappé par une malédiction et subit 50 dégâts ! Il ne lui reste plus que ${Color.Cyan}${cible.currentHealth}/${cible.maxHealth} points de vie${Style.Reset}.\n`;
                }
            }
        }
        return text + "Appuyez sur entrée"
    }
}