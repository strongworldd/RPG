import { Character } from "../classCharacters/Character.ts";
import { Color, Style } from "../Color.ts";
import { Consommable } from "./Consommable.ts";

export class Talaria extends Consommable {
  constructor() {
    super("Talaria", 0, 0, 3, 0, 0);
  }

  override use(target: Character): string {
    return `${Color.Blue}${target.name}${Style.Reset} a enfilé ces ${Color.Yellow}${this.name}${Style.Reset}.\n` + target.boostSpeed(this.boostSpeed);
  }
}