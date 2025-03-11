import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";

export class Vampire extends Monstre {
    constructor() {
        super("Vampire Sanguinaire", 150, 25);
    }

    actVampire(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${this.name} se régénère grâce à son attaque !`);
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 10);
    }
}