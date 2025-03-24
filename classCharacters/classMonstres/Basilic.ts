import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Basilic extends Monstre {
    lastAttacker: Character | null = null;

    constructor() {
        super("Basilic Venimeux", 80, 28);
    }

    subirAttaque(attacker: Character): void {
        this.lastAttacker = attacker;
    }

    agir(aventuriers: Character[]): void {
        const cible = super.act(aventuriers); // La cible principale de l'attaque
    
        if (cible) {
            this.applyDebuff(cible); // Applique le ralentissement à la cible principale
        }
    
        // Applique un effet secondaire à tous les aventuriers vivants
        aventuriers
            .filter(aventurier => aventurier.isAlive() && aventurier !== cible)
            .forEach(aventurier => {
                this.applyDebuff(aventurier);
            });
    }
    
    private applyDebuff(aventurier: Character): void {
        const reduction = Math.min(3, aventurier.speed - 1);
        aventurier.speed -= reduction;
        console.log(`${Color.Blue}${aventurier.name}${Style.Reset} est ralenti de ${reduction} points ! Nouvelle vitesse : ${aventurier.speed}`);
    }
}