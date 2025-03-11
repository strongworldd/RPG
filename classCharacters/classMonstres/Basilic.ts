import { Monstre } from "./Monstre.ts";
import Character from "../Character.ts";

export class Basilic extends Monstre {
    lastAttacker: Character | null = null;

    constructor() {
        super("Basilic Venimeux", 180, 28);
    }

    subirAttaque(attacker: Character): void {
        this.lastAttacker = attacker;
    }

    agir(aventuriers: Character[]): void {
        const cible = super.act(aventuriers);

        if (this.lastAttacker) {
            this.applyDebuff(this.lastAttacker);
            this.lastAttacker = null; 
        }

        if (cible) {
            this.applyDebuff(cible);
        }
    }

    private applyDebuff(aventurier: Character): void {
        const reduction = Math.min(3, aventurier.speed - 1);
        aventurier.speed -= reduction;
        console.log(`${aventurier.name} est ralenti de ${reduction} points ! Nouvelle vitesse : ${aventurier.speed}`);
    }
}