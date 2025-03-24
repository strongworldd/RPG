import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Vampire extends Monstre {
    constructor() {
        super("Vampire Sanguinaire", 100, 25, 7);
    }

    actVampire(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${Color.Red}${this.name}${Style.Reset} se régénère grâce à son attaque !`);
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 10);
    }
}