import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";

export class Spectre extends Monstre {

    override name: string = "Spectre Hanté";
    constructor() {
        super("Spectre Hanté", 80, 20);
    }

    actSpectre(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${this.name} devient éthéré et esquive la prochaine attaque !`);
    }

    esquive(): boolean {
        const chance = this.currentHealth < 50 ? 0.25 : 0.20;
        return Math.random() < chance;
    }
}