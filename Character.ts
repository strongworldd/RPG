export default class Character {
    name = "";
    physicalAttack = 0;
    defenseAttack = 0;
    speed = 0;
    maxHealth = 0;
    currentHealth = 0;

    constructor(name :string, physicalAttack :number, defenseAttack :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.defenseAttack = defenseAttack;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }

    attack=(target :Character) :string => {
        target.currentHealth -= this.physicalAttack - target.defenseAttack;
        return this.name + " deals " + (this.physicalAttack - target.defenseAttack) + " damage.";
    }

    heal=(healNumber :number) :string => {
        if (this.currentHealth + healNumber > this.maxHealth) {
            this.currentHealth = this.maxHealth;
            return "The character got heal " + healNumber + " HP and has now " + this.currentHealth + "HP."
        } else {
            this.currentHealth += healNumber;
            return "The character got heal " + healNumber + " HP and has now " + this.currentHealth + "HP."
        }
    }

    revive=(healRevive :number) :string=> {
        if (this.currentHealth == 0){
            this.currentHealth = healRevive;
            return "The character is now alive with " + healRevive + "HP."
        } else {
            return "The character is not dead you can't revive it"
        }
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }
}