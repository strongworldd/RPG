import Character from './Character.ts';

export class Guerrier extends Character {
    
    constructor(name :string, speed :number) {
        super(name, 25, 5, speed, 100, 100);
    }
}