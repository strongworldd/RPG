import Character from "./Character.ts";

export class Paladin extends Character {
    constructor(name :string, speed :number) {
        super(name, 20, 8, speed, 100, 100)
    }

    sainteAttack(target :Character | Character[]){
        if (Array.isArray(target)) {
            target.forEach(cible => {
                this.attack(cible)
            });
        }else{
            this.attack(target)
        }
        
    }
}