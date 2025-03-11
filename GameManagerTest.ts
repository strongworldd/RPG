import { GameManager } from "./GameManager.ts";
import { Inventaire } from "./Inventaire.ts";
import { Menu } from "./Menu.ts";

export const menu = new Menu();
export const bagage = new Inventaire();
export const gameManager = new GameManager()
gameManager.mainLoop()