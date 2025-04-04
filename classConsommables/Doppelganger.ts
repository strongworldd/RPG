import { Character } from "../classCharacters/Character.ts";
import { Color, Style } from "../Color.ts";
import { Consommable } from "./Consommable.ts";

export class Doppelganger extends Consommable {
    constructor() {
        super("Doppelganger", 0, 0, 0, 10, 0);
    }

    use(target: Character): string {
        return `${Color.Blue}${target.name}${Style.Reset} a fait apparaître un doppelganger.\n` + target.boostDamage(this.boostDamage);
    }
}