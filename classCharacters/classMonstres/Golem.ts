import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Golem extends Monstre {
    private hasUsedStoneSkin = false;

    constructor() {
        super("Golem de Pierre", 125, 15, 0);
    }

    override attackBoss = (_cibles :Character[]) :string => { return "nothing" }
    override attackMonstre = (aventuriers: Character) :string =>{
        let text = ""
        if (!this.hasUsedStoneSkin) {
            this.currentHealth += 50;
            this.maxHealth += 50;
            this.hasUsedStoneSkin = true;
            text = `\n${Color.Red}${this.name}${Style.Reset} active sa peau de pierre et augmente sa vie max de 50 !\n${Color.Red}${this.name}${Style.Reset} a désormais ${Color.Cyan}${this.currentHealth}/${this.maxHealth} points de vie.${Style.Reset}`;
        }
        return this.attack(aventuriers) + text
    }
    
}