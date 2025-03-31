import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Spectre extends Monstre {
    private unusedSkill = true
    public esquiveAttack = false

    override name: string = "Spectre Hanté";
    constructor() {
        super("Spectre Hanté", 80, 20, 5);
    }

    override attackMonstre = (aventuriers: Character): string =>{
        let text = "";
        if (this.unusedSkill) {
            this.unusedSkill = false
            this.esquiveAttack = true
            text = `\n${Color.Red}${this.name}${Style.Reset} devient éthéré et esquive les attaques jusqu'à son prochain tour !`
        }else{
            this.esquiveAttack = false
        }
        return this.attack(aventuriers) + text
    }
    public override isEsquive(): boolean {
        return this.esquiveAttack
    }
    override attackBoss = (_cibles :Character[]) :string => {return "nothing"}
}