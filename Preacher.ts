import Character from './Character.ts';

export class Prêtre extends Character {
    constructor(nom: string, pv: number,) {
        super(nom, 6, 1, 0, pv, pv);
    }

    specialheal= (healnumber: number,target: Character) :string => {
        if (target.current_health+healnumber>target.max_health){
            target.current_health=target.max_health
        } else {
            target.current_health+=healnumber
        }
        return "Le personnage se soigne "+healnumber+" points de vie et a maintenant "+this.current_health+"points de vie."
    }
}