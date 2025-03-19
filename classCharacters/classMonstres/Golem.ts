import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Golem extends Monstre {
    constructor() {
        super("Golem de Pierre", 125, 15);
    }

    actGolem(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${Color.Red}${this.name}${Style.Reset} active sa peau de pierre et réduit les dégâts reçus !`);
        this.defenseAttack += 5;
    }
}