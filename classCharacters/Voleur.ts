import { Ether } from "../classConsommables/Ether.ts";
import { HalfStar } from "../classConsommables/HalfStar.ts";
import { HealPotion } from "../classConsommables/HealPotion.ts";
import { StarShard } from "../classConsommables/StarShard.ts";
import { bagage } from "../MenuTest.ts";
import Character from "./Character.ts";

export class Voleur extends Character{

    constructor(name :string) {
        super(name, 20, 5, 8, 100, 100)
    }

    robbery(target :Character){
        const chance = Math.random()*100
        if (chance < 40) {
            return `${this.name} n'a rien voler à ${target.name}`;
        } else if (chance < 70) {
            bagage.add(new HealPotion())
            return `${this.name} a voler une potion de soin à ${target.name}`;
        } else if (chance < 85) {
            bagage.add(new StarShard())
            return `${this.name} a voler un fragement d'étoile à ${target.name}`;
        } else if (chance < 95) {
            bagage.add(new Ether())
            return `${this.name} a voler un ether à ${target.name}`;
        } else {
            bagage.add(new HalfStar())
            return `${this.name} a voler une demi-étoile à ${target.name}`;
        }
    }
}