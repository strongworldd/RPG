import { Color, Style } from '../Color.ts';
import { Character } from './Character.ts';

export class Pretre extends Character {

    override specialAttackName = "specialHeal"

    constructor(nom: string) {
        super(nom, 15, 2, 6, 100, 100);
    }

    static override displayInfo(): string {
        return `${Color.Blue}Pretre${Style.Reset}   - ${Color.BrightRed}Attaque Physique: 15${Style.Reset} - ${Color.Green}Défense: 2${Style.Reset} - ${Color.BrightMagenta}Vitesse: 6${Style.Reset} - ${Color.Cyan}PV Max: 100${Style.Reset}\n${Color.Orange}Attaque spéciale: ${Style.Reset}Action de soin permettant de restaurer 25% des points de vie d'un allié ou de lui-même.`;
    }

    override specialAttack(target: Character){
        let healNumber = target.maxHealth * 0.25
        if (target.currentHealth + healNumber > target.maxHealth){
            healNumber = target.maxHealth - target.currentHealth
            target.currentHealth = target.maxHealth
        } else {
            target.currentHealth += healNumber
        }
        return `${Color.Blue}${this.name}${Style.Reset} soigne ${Color.Blue}${target.name}${Style.Reset} de ${Color.Green}${healNumber}${Style.Reset}, ${Color.Blue}${target.name}${Style.Reset} est désormais à ${Color.Cyan}${target.currentHealth}/${target.maxHealth} points de vie${Style.Reset}.`
    }
}