import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Chimere extends Monstre {
    private unusedSkill = true

    constructor() {
        super("Chimère Mutante", 100, 20, 5);
    }

    override attackBoss = (_cibles :Character[]) :string => { return "nothing" }
    override attackMonstre = (aventuriers: Character) :string =>{
        let text = "";
        if (this.unusedSkill) {
            this.physicalAttack += 5;
            this.unusedSkill = false
            text = `\n${Color.Red}${this.name}${Style.Reset} change de forme et augmente son attaque de 5 !\n${Color.Red}${this.name}${Style.Reset} fait désormais ${Color.BrightRed}${this.physicalAttack}${Style.Reset} points de dégats`
        }
        return this.attack(aventuriers) + text
    }
    
}