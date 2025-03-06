import Character from "./Character.ts";

export class Paladin extends Character {
    constructor(name :string, speed :number) {
        super(name, 20, 8, speed, 100, 100)
    }
}