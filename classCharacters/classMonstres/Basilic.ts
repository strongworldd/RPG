import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Basilic extends Monstre {
    lastAttacker: Character | null = null;

    constructor() {
        super("Basilic Venimeux", 80, 28, 6); 
    }

    subirAttaque(attacker: Character): void {
        this.lastAttacker = attacker;
    }

    agir(aventuriers: Character[]): void {
        const cible = super.act(aventuriers); 
    
        if (cible) {
            this.applyDebuff(cible); 
        }
    }
    
     private applyDebuff(aventurier: Character): void {
        const reduction = 1; 
        aventurier.speed = Math.max(0, aventurier.speed - reduction); 
        console.log(`${Color.Blue}${aventurier.name}${Style.Reset} est ralenti de ${reduction} point ! Nouvelle vitesse : ${aventurier.speed}`);
    }
}