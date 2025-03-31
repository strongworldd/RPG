import { Color, Style } from '../../Color.ts';
import { Character } from '../Character.ts';

export class Monstre extends Character {

    constructor(name: string, pv: number, attack: number, speed: number) {
        super(name, attack, 0, speed, pv, pv);
    }

    attackMonstre = (_cible: Character) :string => { return "nothing" }
    attackBoss = (_cibles :Character[]) :string => { return "sdf" }
    override specialAttack(){}
    protected override getColor(target: Monstre, attacking: number): string {
        if (target.currentHealth - attacking > 0) {
            target.currentHealth -= attacking;
            return `${Color.Red}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Blue}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} points de vie${Style.Reset}.`;
        } else {
            return `${this.died()} grâce à ${Color.Blue}${this.name}${Style.Reset}!`;
        }
    }
    protected override died(): string {
        this.currentHealth = 0;
        return (`${Color.Red}${this.name}${Style.Reset} est mort !`)
    }
}