import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Golem extends Monstre {
    private hasUsedStoneSkin = false;

    constructor() {
        super("Golem de Pierre", 125, 15, 0);
    }

    actGolem(aventuriers: Character[]): void {
        if (!this.hasUsedStoneSkin) {
            console.log(`${Color.Red}${this.name}${Style.Reset} active sa peau de pierre et réduit les dégâts reçus !`);
            this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 50);
            this.hasUsedStoneSkin = true;
        }

        super.act(aventuriers);
    }
}