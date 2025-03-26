import { Character } from '../Character.ts';

export class Monstre extends Character {

    constructor(name: string, pv: number, attack: number, speed: number) {
        super(name, attack, 0, speed, pv, pv);
    }

     attackMonstre = (_cible: Character):string=>{return "nothing"}
     attackBoss = (_cibles :Character[]):string=>{ return "sdf"}
    override specialAttack(){}
}