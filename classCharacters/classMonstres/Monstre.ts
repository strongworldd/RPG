import Character from '../Character.ts';

export abstract class Monstre extends Character {

    constructor(name: string, pv: number, attack: number) {
        super(name, attack, 0, 0, pv, pv);
    }

    act(aventuriers: Character[]): Character | null {
        const vivantAventuriers = aventuriers.filter(aventurier => aventurier.isAlive());
        if (vivantAventuriers.length === 0) return null;

        const random = Math.random();
        let cible: Character;

        if (random < 0.2) {
            cible = vivantAventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        } else {
            const index = Math.floor(Math.random() * vivantAventuriers.length);
            cible = vivantAventuriers[index];
        }

        console.log(this.attack(cible));
        return cible;
    }
}