import { Character } from './Character.ts';
import { Color, Style } from "../Color.ts";

export class Guerrier extends Character {

    constructor(name :string) {
        super(name, 30, 10, 5, 100, 100);
    }
    static override displayInfo(): string {
        return `${Color.Blue}Guerrier${Style.Reset} - ${Color.BrightRed}Attaque Physique: 30${Style.Reset} - ${Color.Green}Défense: 5${Style.Reset} - ${Color.BrightMagenta}Vitesse: 5${Style.Reset} - ${Color.Cyan}PV Max: 120${Style.Reset}`;
    }

    override specialAttack():void{}
}