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

    attack=(target: Character):string => {
        target.current_health-=this.physical_attack-target.defense_attack;
        return this.name +" inflige "+(this.physical_attack-target.defense_attack)+" points de dégat.";
    attack=(target :Character) :string => {
        target.currentHealth -= this.physicalAttack - target.defenseAttack;
        return this.name + " deals " + (this.physicalAttack - target.defenseAttack) + " damage.";
    }

    heal=(healnumber: number):string => {
        if (this.current_health+healnumber>this.max_health) {
            this.current_health=this.max_health;
    heal=(healNumber :number) :string => {
        if (this.currentHealth + healNumber > this.maxHealth) {
            this.currentHealth = this.maxHealth;
            return "The character got heal " + healNumber + " HP and has now " + this.currentHealth + "HP."
        } else {
            this.current_health+=healnumber;
            this.currentHealth += healNumber;
            return "The character got heal " + healNumber + " HP and has now " + this.currentHealth + "HP."
        }
        return "Le personnage se soigne "+healnumber+" points de vie et a maintenant "+this.current_health+"points de vie."
    }

    revive=(healrevive: number): string=> {
        if (this.current_health==0){
            this.current_health=healrevive;
            return "Le personnage ressuscite avec "+healrevive+"points de vie."
    revive=(healRevive :number) :string=> {
        if (this.currentHealth == 0){
            this.currentHealth = healRevive;
            return "The character is now alive with " + healRevive + "HP."
        } else {
            return "Le personnage est mort et vous ne pouvez pas le ressusciter"
        }
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }
}