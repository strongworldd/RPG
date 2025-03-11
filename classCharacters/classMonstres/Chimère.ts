import { Monstre } from "./Monstre.ts";
import Character from "../Character.ts";

export class Chimère extends Monstre {
    constructor() {
        super("Chimère Mutante", 200, 20);
    }

    actChimère(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${this.name} change de forme et augmente son attaque de 5 !`);
        this.physicalAttack += 5; 
    }
}