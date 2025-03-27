import { Character } from './Character.ts';

export class Guerrier extends Character {

    constructor(name :string) {
        super(name, 30, 10, 5, 100, 100);
    }
    static override displayInfo(): string {
            return "Guerrier - Attaque Physique: 15 - Défense: 10 - Vitesse: 12 - PV Max: 120";
    }

    override specialAttack():void{}
}