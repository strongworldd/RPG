import { Color, Style } from '../Color.ts';
import { Character } from './Character.ts';

export class Pretre extends Character {

    override specialAttackName = "specialHeal"

    constructor(nom: string) {
        super(nom, 15, 2, 6, 100, 100);
    }

    static override displayInfo(): string {
        return "Pretre - Attaque Physique: 15 - Défense: 2 - Vitesse: 6 - PV Max: 100";
}

    override specialAttack(target: Character){
        let healNumber = target.maxHealth * 0.25
        if (target.currentHealth + healNumber > target.maxHealth){
            healNumber = target.maxHealth - target.currentHealth
            target.currentHealth = target.maxHealth
        } else {
            target.currentHealth += healNumber
        }
        return `${Color.Blue}${this.name}${Style.Reset} soigne ${Color.Green}${target.name}${Style.Reset} de ${Color.Yellow}${healNumber}${Style.Reset}, ${Color.Blue}${target.name}${Style.Reset} à désormais ${Color.Green}${target.currentHealth}${Style.Reset} point de vie.`
    }
}