export class Menu {
    static startMenu(): string[] {
        const options = ["Guerrier", "Mage", "Paladin", "Barbare", "Prêtre", "Voleur"];
        const choices = prompt("Choisissez 3 aventuriers parmi les 6 disponibles \n Guerrier: 1 \n Mage: 2 \n Paladin: 3 \n Barbare: 4 \n Prêtre: 5 \n Voleur: 6\n Entrez trois numéros séparés par des virgules (ex : 1,2,3)");

        if (!choices) return this.startMenu();

        const adventurerIndex = choices.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 6);

        if (adventurerIndex.length !== 3) {
            alert("Vous devez choisir exactement 3 aventuriers parmi les options disponibles.");
            return this.startMenu();
        }

        const selectedAdventurers = adventurerIndex.map(index => options[index - 1]);

        console.log("Aventuriers sélectionnés :", selectedAdventurers);
        return selectedAdventurers;
    }
    
    static action = (): void => {
        const action = prompt("Quelle action voulez vous effectuer? \n Attaquer: 1 \n Action Spéciale: 2 \n Utiliser un object: 3 \n ");
        if (!action || !["1", "2", "3"].includes(action)) {
            alert("Choix invalide. Veuillez choisir entre 1, 2 ou 3.");
            return this.action();
        }

        const target = prompt(
            action === "1" ? "Choisissez l'ennemi à attaquer" :
            action === "2" ? "Choisissez une action spéciale" :
            "Choisissez l'objet à utiliser"
        );

        console.log("Action choisie :", action, "Cible/Objet :", target);
    }
}