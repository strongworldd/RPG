import { Color, Style } from "../Color.ts";

export abstract class Character {
    name = "";
    physicalAttack = 0;
    physicalAttackBase = 0;
    defense = 0;
    speed = 10;
    baseSpeed = 10; 
    maxHealth = 100;
    currentHealth = 100;
    maxMana = 0;
    currentMana = 0;
    magicAttack = 0;
    specialAttackName = "";
    activeBoostDamage = false;
    //activeBoostDefense = false;
    activeBoostSpeed = false;

    constructor(name :string, physicalAttack :number, defense :number, speed :number, maxHealth :number, currentHealth :number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.physicalAttackBase = physicalAttack;
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
        let attacking :number;
        let ret :string;
    
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
        if (target.isEsquive()) {
            return `${Color.Red}${target.name}${Style.Reset} éblouit ${Color.Blue}${this.name}${Style.Reset} et esquive l'attaque !`;
        } else {
            ret = this.getColor(target, attacking)
            if (this.activeBoostDamage) {
                this.activeBoostDamage = false;
                this.physicalAttack = this.physicalAttackBase;
                ret += `\nLe ${Color.Yellow}Doppelganger${Style.Reset} de ${Color.Blue}${this.name}${Style.Reset} meurt et son attaque physique revient à la normal.\n${Color.Blue}${this.name}${Style.Reset} fait maintenant ${Color.BrightRed}${this.physicalAttack} points de dégâts${Style.Reset}.`;
            }
            //if (this.activeBoostDefense) {
            //    this.activeBoostDefense = false;
            //    ret += `\nLe ${Color.Yellow}Doppelganger${Style.Reset} de ${Color.Blue}${this.name}${Style.Reset} meurt et sa défense revient à la normal.\n${Color.Blue}${this.name}${Style.Reset} fait maintenant ${Color.BrightRed}${(this.physicalAttack -= 10)} points de dégâts${Style.Reset}.`;
            //}
            if(this.activeBoostSpeed) {
                this.activeBoostSpeed = false;
                ret += `\nLes ${Color.Yellow}Talaria${Style.Reset} de ${Color.Blue}${this.name}${Style.Reset} deviennent trop usées et sa vitesse revient à la normal.\n${Color.Blue}${this.name}${Style.Reset} à maintenant ${Color.BrightBlue}${(Math.max(0, this.speed -= 3))} points de vitesse${Style.Reset}.`;
            }
            return ret
        }
    };
    public isEsquive():boolean{return false}

    protected getColor(target :Character, attacking :number) :string{
        if (target.currentHealth - attacking > 0) {
            target.currentHealth -= attacking;
            return `${Color.Blue}${this.name}${Style.Reset} inflige ${attacking} points de dégât à ${Color.Red}${target.name}${Style.Reset}. Il ne lui reste plus que ${Color.BrightCyan}${target.currentHealth}/${target.maxHealth} points de vie${Style.Reset}.`;
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
        return `${Color.Blue}${this.name}${Style.Reset} se soigne de ${Color.Green}${healNumber}${Style.Reset} points de vie et est maintenant à ${Color.Green}${this.currentHealth}/${this.maxHealth}${Style.Reset} points de vie.`
    }

    regenMana(regenNumber :number) :string{
        if (this.currentMana + regenNumber > this.maxMana) {
            regenNumber = this.maxMana - this.currentMana
            this.currentMana = this.maxMana
        }else{
            this.currentMana += regenNumber
        }
        return `${Color.Blue}${this.name}${Style.Reset} à récupéré ${Color.Green}${regenNumber}${Style.Reset} mana et est désormais à ${Color.Cyan}${this.currentMana}/${this.maxMana} mana${Style.Reset}.`
    }

    boostDamage = (boost :number) :string => {
        this.activeBoostDamage = true;
        this.physicalAttack += boost;
        return `${Color.Blue}${this.name}${Style.Reset} boost son attaque physique de ${Color.BrightRed}${boost}${Style.Reset} points et fait maintenant ${Color.BrightRed}${this.physicalAttack} points de dégâts${Style.Reset}.`;
    }

    //boostDefense = (boost :number) :string => {
    //    this.activeBoostDefense = true;
    //}

    boostSpeed = (boost :number) :string => {
        this.activeBoostSpeed = true;
        boost = Math.min(10 - (this.speed + boost), 3);
        this.speed += boost;
        return `${Color.Blue}${this.name}${Style.Reset} boost sa vitesse de ${Color.BrightBlue}${boost}${Style.Reset} points et à maintenant ${Color.BrightBlue}${this.speed} points de vitesse${Style.Reset}.`;
    }

    died() :string{
        this.currentHealth = 0;
        return (`${Color.Blue}${this.name}${Style.Reset} est mort,`)
    }

    revive = (healRevive :number) :string => {
        this.currentHealth = healRevive;  
        return `${Color.Blue}${this.name}${Style.Reset} ressuscite avec ${Color.Cyan}${this.currentHealth}/${this.maxHealth} points de vie${Style.Reset}.`
    }

    isAlive() :boolean {
        return this.currentHealth > 0;
    }
}
