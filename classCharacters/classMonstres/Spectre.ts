import { Monstre } from "./Monstre.ts";
import { Character } from "../Character.ts";
import { Color, Style } from "../../Color.ts";

export class Spectre extends Monstre {
    private unusedSkill = true;
    public esquiveAttack = false;
    private attackCount = 0;

    constructor() {
        super("Spectre Hanté", 80, 20, 5);
    }

    override attackBoss = (_cibles :Character[]) :string => { return "nothing" }
    override attackMonstre = (aventurier: Character) :string =>{
        let text = "";
        this.attackCount++;

        if (this.unusedSkill) {
            this.unusedSkill = false;
            this.esquiveAttack = true;
            text = `\n${Color.Red}${this.name}${Style.Reset} devient éthéré et esquive les attaques jusqu'à son prochain tour.`;
        } else {
            this.esquiveAttack = false;
        }

        // Ajouter un message si c'est la deuxième attaque
        if (this.attackCount === 2) {
            text += `\n${Color.Red}${this.name}${Style.Reset} n'est plus éthéré et peux de nouveau se faire attacker.`;
        }

        return this.attack(aventurier) + text;
    };

    override isEsquive(): boolean {
        return this.esquiveAttack;
    }
}