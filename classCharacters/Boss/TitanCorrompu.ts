import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class TitanCorrompu extends Monstre {
    constructor() {
        super("Titan Corrompu", 200, 40, 10);
    }

    override attackMonstre = (_cible: Character): string => { return "nothing"; }

    override attackBoss = (aventuriers: Character[]): string => {
        let cible;
        let text = "";
        const random = Math.random();
        if (random < 0.2) {
            cible = aventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        } else {
            const index = Math.floor(Math.random() * aventuriers.length);
            cible = aventuriers[index];
        }

        const random2 = Math.random();
        if (random2 < 0.7) {
            text += `${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} !\n`;
            text += this.attack(cible);
        } else {
            text += `${Color.Red}${this.name}${Style.Reset} frappe le sol, créant une onde de choc qui déséquilibre ses ennemis !\n`;
            aventuriers.forEach(aventurier => {
                if (aventurier.isAlive()) {
                    aventurier.speed = Math.max(1, aventurier.speed - 3);
                    text += `${Color.Blue}${aventurier.name}${Style.Reset} est déséquilibré et perd 3 points de vitesse ! Nouvelle vitesse : ${aventurier.speed}\n`;
                }
            });

            text += `${Color.Red}${this.name}${Style.Reset} concentre son énergie sombre et libère un coup titanesque sur le plus fort !\n`;
            const strongest = aventuriers.reduce((prev, curr) => (prev.physicalAttack > curr.physicalAttack ? prev : curr));
            if (strongest.isAlive()) {
                strongest.currentHealth -= 60;
                if (strongest.currentHealth <= 0) {
                    strongest.currentHealth = 0;
                    text += `${Color.Blue}${strongest.name}${Style.Reset} est écrasé sous la force du Titan Corrompu !\n`;
                } else {
                    text += `${Color.Blue}${strongest.name}${Style.Reset} subit un coup titanesque de 60 dégâts ! Il lui reste ${Color.Cyan}${strongest.currentHealth}/${strongest.maxHealth} PV${Style.Reset}.\n`;
                }
            }
        }
        return text + "Appuyez sur entrer";
    }
}