import { Character } from '../Character.ts';

export abstract class Monstre extends Character {

    constructor(name: string, pv: number, attack: number) {
        super(name, attack, 0, 0, pv, pv);
    }

    act(aventuriers: Character[]): Character | null {
        const vivantAventuriers = aventuriers.filter(aventurier => aventurier.isAlive());
        if (vivantAventuriers.length === 0) return null;
    
        const random = Math.random();
        let cible: Character;
    
        // Sélectionne la cible avec la santé la plus basse (20% de chance)
        if (random < 0.2) {
            cible = vivantAventuriers.reduce((prev, curr) => (prev.currentHealth < curr.currentHealth ? prev : curr));
        } else {
            // Sélectionne une cible aléatoire (80% de chance)
            const index = Math.floor(Math.random() * vivantAventuriers.length);
            cible = vivantAventuriers[index];
        }
    
        // Effectue l'attaque sur la cible sélectionnée
        this.attack(cible);
        return cible;
    }
}