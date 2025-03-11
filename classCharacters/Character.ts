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

    constructor(name :string, physicalAttack :number, defenseAttack :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.defenseAttack = defenseAttack;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }

    public attack = (target: Character, attackType: string = ""): string => {
        let attacking: number;
    
        switch (attackType) {
            case "sorcererAttack":
                if (target.currentHealth - target.magicAttack > 0) {
                    target.currentHealth -= target.magicAttack;
                    return `${this.name} inflige ${this.magicAttack} points de dégât magique à ${target.name}. Il ne lui reste plus que ${target.currentHealth}/${target.maxHealth}`;
                } else {
                    return `${target.died()} grâce à ${this.name}!`;
                }
    
            case "divinAttack":
                attacking = (this.physicalAttack - target.defenseAttack) * 0.4;
                break;
    
            case "berserkAttack":
                attacking = (this.physicalAttack - target.defenseAttack) * 1.3;
                break;
    
            default:
                attacking = this.physicalAttack - target.defenseAttack;
                break;
        }
    
        if (target.currentHealth - attacking > 0) {
            target.currentHealth -= attacking;
            return `${this.name} inflige ${attacking} points de dégât à ${target.name}. Il ne lui reste plus que ${target.currentHealth}/${target.maxHealth}`;
        } else {
            return `${target.died()} grâce à ${this.name}!`;
        }
    };
    

    protected hurt = (deCbm :number) :string => {
        if(this.currentHealth - deCbm > 0){
            this.currentHealth -= deCbm;
            return this.name + " s'inflige " + deCbm + " points de dégat.";
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
        return "Le personnage se soigne de " + healNumber + " points de vie et est maintenant à" + this.currentHealth + "points de vie."
    }

    regenMana(regenNumber :number) :string{
        if (this.currentMana + regenNumber > this.maxMana) {
            regenNumber = this.maxMana - this.currentMana
            this.currentMana = this.maxMana
        }else{
            this.currentMana += regenNumber
        }
        return `${this.name} à récupéré ${regenNumber} et est désormais à ${this.currentMana}`
    }

    private died() :string{
        return (`${this.name} est mort !`)
    }

    revive = (healRevive :number) :string => {
        this.currentHealth = healRevive;  
        return "Le personnage ressuscite avec " + healRevive + "points de vie."
    }

    isAlive() :boolean {
        return this.currentHealth > 0;
    }
}