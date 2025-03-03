import Character from './Character.ts';

export class Prêtre extends Character {
    constructor(nom: string, pv: number,) {
        super(nom, 6, 1, 0, pv, pv);
    }

    specialheal= (healnumber: number,target: Character) :string => {
        if (target.currentHealth+healnumber>target.maxHealth){
            target.currentHealth=target.maxHealth
        } else {
            target.currentHealth+=healnumber
        }
        return "Le personnage se soigne "+healnumber+" points de vie et a maintenant "+this.currentHealth+"points de vie."
    }
}