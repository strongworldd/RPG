import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Basilic extends Monstre {
    lastAttacker: Character | null = null;

    constructor() {
        super("Basilic Venimeux", 80, 28, 6); 
    }

    override attackMonstre = (aventuriers: Character): string =>{
        return this.attack(aventuriers) + this.applyDebuff(aventuriers); 
    }
    
    private applyDebuff(aventurier: Character): string {
        const reduction = 1; 
        aventurier.speed = Math.max(0, aventurier.speed - reduction); 
        return (`\n${Color.Blue}${aventurier.name}${Style.Reset} est ralenti de ${reduction} point ! Nouvelle vitesse : ${aventurier.speed}`);
    }
    override attackBoss = (_cibles :Character[]):string => {return"nothing"}
}