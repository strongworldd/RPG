import { Menu } from "./Menu.ts";
import { Inventaire } from "./Inventaire.ts";

export const bagage = new Inventaire();
export const menu = new Menu();
menu.startMenu()