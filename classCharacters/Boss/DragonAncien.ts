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
            const damage = this.physicalAttack - cible.defense;
            cible.currentHealth = Math.max(0, cible.currentHealth - damage);
                return `${Color.Red}${this.name}${Style.Reset} attaque ${Color.Blue}${cible.name}${Style.Reset} et inflige ${Color.BrightRed}${damage}${Style.Reset} points de dégâts.\n` +
                       `${cible.currentHealth > 0 ? `${Color.Blue}${cible.name}${Style.Reset} n'as plus que ${Color.Cyan}${cible.currentHealth}/${cible.maxHealth} points de vie${Style.Reset}.\n`: `${Color.Blue}${cible.name}${Style.Reset} est mort à cause de ${Color.Red}${this.name}${Style.Reset}.\n`}`;
        } else {
            text += `${Color.Red}${this.name}${Style.Reset} rugit, intimidant ses ennemis et réduisant leur attaque de 5 points !\n`;
            aventuriers.forEach(aventurier => {
                if (aventurier.isAlive()) {
                    aventurier.physicalAttack = Math.max(1, aventurier.physicalAttack - 5);
                    text += `${Color.Blue}${aventurier.name}${Style.Reset} a maintenant une attaque de ${Color.Cyan}${aventurier.physicalAttack}${Style.Reset}.\n`;
                }
            });

            text += `${Color.Red}${this.name}${Style.Reset} souffle des flammes sur tout le groupe !\n`;
            aventuriers.forEach(aventurier => {
                if (aventurier.isAlive()) {
                    aventurier.currentHealth -= 40;
                    if (aventurier.currentHealth <= 0) {
                        text += `${Color.Blue}${aventurier.name}${Style.Reset} est mort !\n`;
                    }else{
                        text += `${Color.Blue}${aventurier.name}${Style.Reset} subit 40 dégâts ! Il ne lui reste plus que ${Color.Cyan}${aventurier.currentHealth}/${aventurier.maxHealth} points de vie${Style.Reset}.\n`;
                    }
                }
            });
            return text + `${Style.Italic}[Appuyez sur entrée]${Style.Reset}`
        }
    }
}