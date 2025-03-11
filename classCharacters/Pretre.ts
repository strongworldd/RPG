import Character from './Character.ts';

export default class Pretre extends Character {
    constructor(nom: string) {
        super(nom, 15, 2, 6, 100, 100);
    }

    specialHeal= (target: Character) :string => {
        let healNumber = target.maxHealth * 0.25
        if (target.currentHealth + healNumber > target.maxHealth){
            healNumber = target.maxHealth - target.currentHealth
            target.currentHealth = target.maxHealth
        } else {
            target.currentHealth += healNumber
        }
        return `${this.name} soigne ${target.name} de ${healNumber}, ${target.name} à désormais ${target.currentHealth} point de vie.`
    }
}