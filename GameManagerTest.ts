import { GameManager } from "./GameManager.ts";
import { Inventaire } from "./Inventaire.ts";
import { Menu } from "./Menu.ts";

Menu.startMenu()
export const bagage = new Inventaire().inventaire;
const gameManager = new GameManager()
gameManager.mainLoop()