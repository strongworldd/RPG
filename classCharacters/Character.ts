import { Mage } from "./mage.ts";

export default class Character {
    name = "";
    physicalAttack = 0;
    defenseAttack = 0;
    speed = 10;
    maxHealth = 100;
    currentHealth = 100;
    maxMana = 0
    currentMana = 0
    magicAttack = 0

    protected constructor(name :string, physicalAttack :number, defenseAttack :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.defenseAttack = defenseAttack;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }

    attack = (target :Character) :string => {
        if (Object.getPrototypeOf(target) === Mage.prototype){
            if(this.currentHealth - this.magicAttack > 0){
                this.currentHealth -= this.magicAttack;
                return this.name + " inflige " + (this.magicAttack) + " points de dégat magique.";
            }else{
                return this.died();
            }
        }else{
            if (target.currentHealth - (this.physicalAttack - target.defenseAttack) > 0) {
                target.currentHealth -= this.physicalAttack - target.defenseAttack;
                return this.name + " inflige " + (this.physicalAttack-target.defenseAttack) + " points de dégat.";
            }else{
                return `${target.died()} grâçe à ${this.name}!`
            }
        }    
    }

    //hurt = (deCbm :number) => {
    //    if(this.currentHealth - deCbm > 0){
    //        this.currentHealth -= deCbm;
    //        console.log(this.name + " inflige " + (deCbm) + " points de dégat");
    //    }else{
    //        console.log(this.died())
    //    }
    //}

    heal = (healNumber :number) :string => {
        if (this.currentHealth + healNumber > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        } else {
            this.currentHealth += healNumber;
        }
        return "Le personnage se soigne " + healNumber + " points de vie et a maintenant " + this.currentHealth + "points de vie."
    }

    died(){
        return `${this.name} est mort !`
    }

    revive = (healRevive :number) :string => {
        if (this.currentHealth == 0){
            this.currentHealth = healRevive;  
        }
        return "Le personnage ressuscite avec " + healRevive + "points de vie."
    }

    isAlive() :boolean {
        return this.currentHealth > 0;
    }
}