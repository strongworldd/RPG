import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Vampire extends Monstre {
    constructor() {
        super("Vampire Sanguinaire", 100, 25, 7);
    }

    override attackMonstre = (aventuriers: Character): string =>{
        const text = this.attack(aventuriers);
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 10);
        return text + (`\n${Color.Red}${this.name}${Style.Reset} se régénère de${Color.Cyan} 10 PV${Style.Reset} grâce à son attaque !`);
    }
    override attackBoss = (_cibles :Character|Character[]):string => {return"nothing"}
}