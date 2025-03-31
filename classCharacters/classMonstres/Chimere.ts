import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Chimere extends Monstre {
    constructor() {
        super("Chimère Mutante", 100, 20, 5);
    }

    override attackMonstre = (aventuriers: Character): string =>{
        const text = this.attack(aventuriers);
        this.physicalAttack += 5; 
        return text + (`\n${Color.Red}${this.name}${Style.Reset} change de forme et augmente son attaque de 5 !`);
    }
    override attackBoss = (_cibles :Character|Character[]):string => {return"nothing"}
}