import Character from './Character.ts';

export class Monstre extends Character {
    constructor(nom :string, pv: number, attaque: number) {
        super(nom, attaque, 0, 0, pv, pv);
    }

    act = (aventuriers: Character[]) : void => {
        const vivantAventuriers = aventuriers.filter(aventurier => aventurier.isAlive());
        if (vivantAventuriers.length === 0) return;

        const random = Math.random();
        let cible: Character;

        if (random < 0.2) {
            cible = vivantAventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        } else {
            const index = Math.floor(Math.random() * vivantAventuriers.length);
            cible = vivantAventuriers[index];
        }

        console.log(this.attack(cible));
    }
}