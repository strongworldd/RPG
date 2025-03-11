import { Monstre } from "./Monstre.ts";
import Character from "../Character.ts";

export class Golem extends Monstre {
    constructor() {
        super("Golem de Pierre", 300, 15);
    }

    actGolem(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${this.name} active sa peau de pierre et réduit les dégâts reçus !`);
        this.defenseAttack += 5;
    }
}