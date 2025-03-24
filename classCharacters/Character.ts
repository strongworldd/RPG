import { Color, Style } from "../Color.ts";

export abstract class Character {
    name = "";
    physicalAttack = 0;
    defenseAttack = 0;
    speed = 10;
    maxHealth = 100;
    currentHealth = 100;
    maxMana = 0
    currentMana = 0
    magicAttack = 0
    specialAttackName = ""

    constructor(name :string, physicalAttack :number, defenseAttack :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.defenseAttack = defenseAttack;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }

    abstract specialAttack(target: Character | Character[]) :void;

    attack = (target: Character, attackType: string = ""): string => {
        let attacking: number;
    
        // Calcul des dégâts en fonction du type d'attaque
        switch (attackType) {
            case "sorcererAttack":
                attacking = this.magicAttack;
                break;
            case "divinAttack":
                attacking = Math.max(0, (this.physicalAttack - target.defenseAttack) * 0.4);
                break;
            case "berserkAttack":
                attacking = Math.max(0, (this.physicalAttack - target.defenseAttack) * 1.3);
                break;
            default:
                attacking = Math.max(0, this.physicalAttack - target.defenseAttack);
                break;
        }
    
        // Réduction des points de vie de la cible
        if (target.currentHealth - attacking > 0) {
            target.currentHealth -= attacking;
            return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} PV${Style.Reset}.`;
        } else {
            target.currentHealth = 0;
            return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. ${target.name} est K.O. !`;
        }
    };
    
    protected hurt = (deCbm :number) :string => {
        if(this.currentHealth - deCbm > 0){
            this.currentHealth -= deCbm;
            return `${Color.Blue}${this.name}${Style.Reset} s'inflige ${deCbm} points de dégat.`;
        }else{
            return this.died()
        }
    }

    heal = (healNumber :number) :string => {
        if (this.currentHealth + healNumber > this.maxHealth) {
            healNumber = this.maxHealth - this.currentHealth
            this.currentHealth = this.maxHealth;
        } else {
            this.currentHealth += healNumber;
        }
        return "Le personnage se soigne de " + healNumber + " points de vie et est maintenant à " + this.currentHealth + " points de vie."
    }

    regenMana(regenNumber :number) :string{
        if (this.currentMana + regenNumber > this.maxMana) {
            regenNumber = this.maxMana - this.currentMana
            this.currentMana = this.maxMana
        }else{
            this.currentMana += regenNumber
        }
        return `${Color.Blue}${this.name}${Style.Reset} à récupéré ${regenNumber} et est désormais à ${this.currentMana}`
    }

    private died() :string{
        return (`${Color.Blue}${this.name}${Style.Reset} est mort !`)
    }

    revive = (healRevive :number) :string => {
        this.currentHealth = healRevive;  
        return "Le personnage ressuscite avec " + healRevive + "points de vie."
    }

    isAlive() :boolean {
        return this.currentHealth > 0;
    }
}