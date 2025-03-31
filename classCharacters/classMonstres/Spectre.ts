import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Spectre extends Monstre {

    override name: string = "Spectre Hanté";
    constructor() {
        super("Spectre Hanté", 80, 20, 5);
    }

    override attackMonstre = (aventuriers: Character): string =>{
       return this.attack(aventuriers) + (`\n${Color.Red}${this.name}${Style.Reset} devient éthéré et esquive la prochaine attaque !`);
    }

    //actuellement pas utiliser
    esquive(): boolean {
        const chance = this.currentHealth < 50 ? 0.25 : 0.20;
        return Math.random() < chance;
    }
    override attackBoss = (_cibles :Character|Character[]):string => {return"nothing"}
}