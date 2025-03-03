export default class Character {
    name="";
    physicalAttack=0;
    defenseAttack=0;
    speed=10;
    maxHealth=100;
    currentHealth=100;

    constructor(name:string,physicalAttack:number,defenseAttack:number,speed:number,maxHealth:number,currentHealth:number) {
        this.name=name;
        this.physicalAttack=physicalAttack;
        this.defenseAttack=defenseAttack;
        this.speed=speed;
        this.maxHealth=maxHealth;
        this.currentHealth=currentHealth;
    }

    attack=(target: Character):string => {
        target.currentHealth-=this.physicalAttack-target.defenseAttack;
        return this.name +" inflige "+(this.physicalAttack-target.defenseAttack)+" points de dégat.";
    }

    heal=(healnumber: number):string => {
        if (this.currentHealth+healnumber>this.maxHealth) {
            this.currentHealth=this.maxHealth;
        } else {
            this.currentHealth+=healnumber;
        }
        return "Le personnage se soigne "+healnumber+" points de vie et a maintenant "+this.currentHealth+"points de vie."
    }

    revive=(healrevive: number):string => {
        if (this.currentHealth==0){
            this.currentHealth=healrevive;  
        }
        return "Le personnage ressuscite avec "+healrevive+"points de vie."
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }
}