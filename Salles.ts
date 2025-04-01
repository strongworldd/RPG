if (salle === 5) {
    const boss = new TitanCorrompu();
    enemies.push(boss);
    console.log(`⚠️ Attention : Vous entrez dans la salle 5, où un boss vous attend : ${boss.name} !`);
    console.log("Liste des ennemis dans la salle 5 :", enemies.map(enemy => enemy.name));
    if (!enemies.includes(boss)) {
        console.error("Erreur : Le boss n'a pas été correctement ajouté à la liste des ennemis !");
    }

    const fight = new Fight(adventurers, enemies);
    fight.start();

    if (!fight.isTeamDefeated(adventurers) && fight.isTeamDefeated(enemies)) {
        console.log("🏆 Félicitations ! Vous avez vaincu le boss et terminé la salle 5 !");
    } else if (fight.isTeamDefeated(adventurers)) {
        console.log("💀 Vous avez échoué à vaincre le boss.");
    }
}
