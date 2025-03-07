export class Menu {

    static startMenu = (): void => {
        const choices = prompt("Choisissez 3 aventuriers parmi les 6 disponibles \n Guerrier: 1 \n Mage: 2 \n Paladin: 3 \n Barbare:4 \n Prêtre:5 \n Voleur: 6\n Entrez trois numéros séparés par des virgules (ex : 1,2,3)");
        if (choices==null){
            this.startMenu()
        } else {
            const adventurers = choices.split(',').map(choice => parseInt(choice.trim()));
            console.log(adventurers)
        }


    }

    public action= (): void => {
        const action = prompt("Quelle action voulez vous effectuer? \n Attaquer: 1 \n Action Spéciale: 2 \n Utiliser un object: 3 \n ");
        console.log(action)
        if (action=="1"){
            const enemy = prompt("Choisissez l'ennemi que vous voulez attaquer")
            console.log(enemy)
        } else if (action=="2") {
            const item = prompt("Choisissez l'ennemi que vous voulez attaquer")
            console.log(item)
        } else if(action=="3"){
            const specialattack = prompt("Choisissez l'action spéciale que vous voulez effectuer")
            console.log(specialattack)
        } else {
            this.action()
        }


    }
}