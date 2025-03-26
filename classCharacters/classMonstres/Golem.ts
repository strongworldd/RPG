import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Golem extends Monstre {
    private hasUsedStoneSkin = false;

    constructor() {
        super("Golem de Pierre", 125, 15, 0);
    }

    override attackMonstre = (aventuriers: Character): string =>{
        let text = ""
        if (!this.hasUsedStoneSkin) {
            this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 50);
            this.hasUsedStoneSkin = true;
            text = `\n${Color.Red}${this.name}${Style.Reset} active sa peau de pierre et réduit les dégâts reçus !`;
        }else{
            text = ""
        }
        return this.attack(aventuriers) + text
    }
    override attackBoss = (_cibles :Character|Character[]):string => {return"nothing"}
}