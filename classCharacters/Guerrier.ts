import Character from './Character.ts';

export class Guerrier extends Character {
    
    constructor(name :string) {
        super(name, 25, 5, 5, 100, 100);
    }
}