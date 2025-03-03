import Character from './Character.ts';

export class Guerrier extends Character {
    
    constructor(name :string, physicalAttack :number, defenseAttack :number, speed :number, maxHealth :number, currentHealth :number) {
        super(name, physicalAttack, defenseAttack, speed, maxHealth, currentHealth);

    }


}