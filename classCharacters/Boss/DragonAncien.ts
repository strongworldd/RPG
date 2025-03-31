import { Monstre } from "../classMonstres/Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";
export class DragonAncien extends Monstre {
    constructor() {
        super("Dragon Ancien", 200, 50, 10);
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
            // 70% chance
            return this.attack(cible) + `${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} !`;
        } else {
            // 30% chance
        text += `${Color.Red}${this.name}${Style.Reset} rugit, intimidant ses ennemis et réduisant leur attaque !\n`;
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.physicalAttack = Math.max(1, aventurier.physicalAttack - 10);
            }
        });

        text += `${Color.Red}${this.name}${Style.Reset} souffle des flammes sur tout le groupe !\n`;
        aventuriers.forEach(aventurier => {
            if (aventurier.isAlive()) {
                aventurier.currentHealth -= 40;
                if (aventurier.currentHealth <= 0) {
                    text += `${Color.Blue}${aventurier.name}${Style.Reset} est mort !\n`;
                }else{
                    text += `${Color.Blue}${aventurier.name}${Style.Reset} subit 40 dégâts ! Il ne lui reste plus que${Color.Cyan}${aventurier.currentHealth}/${aventurier.maxHealth} PV${Style.Reset}.\n`;
                }
            }
        });
        return text + "Appuyez sur entrer"
    }
}
}