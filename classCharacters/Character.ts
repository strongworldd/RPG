import { Color, Style } from "../Color.ts";
<<<<<<< HEAD
 import { Monstre } from "./classMonstres/Monstre.ts";
 
 export class Character {
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
         switch (attackType) {
         case "sorcererAttack":
             if (target.currentHealth - target.magicAttack > 0) {
                 target.currentHealth -= target.magicAttack;
                 return `${Color.Blue}${this.name}${Style.Reset} inflige ${this.magicAttack} points de dégât magique à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}$${target.currentHealth}/${target.maxHealth} PV${Style.Reset}`;
             } else {
                 return `${target.died()} grâce à ${Color.Blue}${this.name}${Style.Reset}!`;
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
         if (target instanceof Monstre){
             if (target.currentHealth - attacking > 0) {
                 target.currentHealth -= attacking;
                 return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} PV${Style.Reset}`;
             } else {
                 return `${target.died()} grâce à ${Color.Blue}${this.name}${Style.Reset}!`;
             }
         } else {
         if (target.currentHealth - attacking > 0) {
             target.currentHealth -= attacking;
             return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} PV${Style.Reset}`;
         } else {
             return `${target.died()} grâce à ${Color.Blue}${this.name}${Style.Reset}!`;
         }
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
         return "Le personnage se soigne de " + healNumber + " points de vie et est maintenant à" + this.currentHealth + "points de vie."
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
=======

export abstract class Character {
    name = "";
    physicalAttack = 0;
    defense = 0;
    speed = 10;
    baseSpeed = 10; 
    maxHealth = 100;
    currentHealth = 100;
    maxMana = 0;
    currentMana = 0;
    magicAttack = 0;
    specialAttackName = "";

    constructor(name :string, physicalAttack :number, defense :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.defense = defense;
        this.speed = speed;
        this.baseSpeed = speed; 
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }

    static displayInfo(): string {
        return "Nom: [Nom par défaut] - Attaque Physique: 0 - Défense: 0 - Vitesse: 10 - PV Max: 100";
    }

    abstract specialAttack(target: Character | Character[]): void;

    attack = (target :Character, attackType :string = "") :string => {
        let attacking: number;
    
        switch (attackType) {
            case "sorcererAttack":
                attacking = this.magicAttack;
                break;
            case "divinAttack":
                attacking = Math.max(0, (this.physicalAttack - target.defense) * 0.4);
                break;
            case "berserkAttack":
                attacking = Math.max(0, (this.physicalAttack - target.defense) * 1.3);
                break;
            default:
                attacking = Math.max(0, this.physicalAttack - target.defense);
                break;
        }
        return this.getColor(target, attacking)
    };
    
    protected getColor(target :Character, attacking :number) :string{
        if (target.currentHealth - attacking > 0) {
            target.currentHealth -= attacking;
            return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} PV${Style.Reset}`;
        } else {
            return `${target.died()} grâce à ${Color.Blue}${this.name}${Style.Reset}!`;
        }
    }

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
        return `${Color.Blue}${this.name}${Style.Reset} se soigne de ${Color.Green}${healNumber}${Style.Reset} points de vie et est maintenant à ${Color.Green}${this.currentHealth}/${this.maxHealth}${Style.Reset} points de vie`
    }

    regenMana(regenNumber :number) :string{
        if (this.currentMana + regenNumber > this.maxMana) {
            regenNumber = this.maxMana - this.currentMana
            this.currentMana = this.maxMana
        }else{
            this.currentMana += regenNumber
        }
        return `${Color.Blue}${this.name}${Style.Reset} à récupéré ${regenNumber} mana et est désormais à ${this.currentMana} mana.`
    }

    protected died() :string{
        this.currentHealth = 0;
        return (`${Color.Blue}${this.name}${Style.Reset} est mort !`)
    }

    revive = (healRevive :number) :string => {
        this.currentHealth = healRevive;  
        return `${this.name} ressuscite avec ${healRevive} points de vie.`
    }

    isAlive() :boolean {
        return this.currentHealth > 0;
    }
}
>>>>>>> origin/valentin
