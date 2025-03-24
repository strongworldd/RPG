import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Chimere extends Monstre {
    constructor() {
        super("Chimère Mutante", 100, 20, 5);
    }

    actChimere(aventuriers: Character[]): void {
        super.act(aventuriers);
        console.log(`${Color.Red}${this.name}${Style.Reset} change de forme et augmente son attaque de 5 !`);
        this.physicalAttack += 5; 
    }
}