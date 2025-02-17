export default class Character {
    name="";
    physical_attack=0;
    defense_attack=0;
    speed=0;
    max_health=0;
    current_health=0;

    constructor(name:string,physical_attack:number,defense_attack:number,speed:number,max_health:number,current_health:number) {
        this.name=name;
        this.physical_attack=physical_attack;
        this.defense_attack=defense_attack;
        this.speed=speed;
        this.max_health=max_health;
        this.current_health=current_health;
    }

    attack=(target: Character):string => {
        target.current_health-=this.physical_attack-target.defense_attack;
        return this.name +" deals "+(this.physical_attack-target.defense_attack)+" damage.";
    }

    heal=(healnumber: number):string => {
        if (this.current_health+healnumber>this.max_health) {
            this.current_health=this.max_health;
            return "The character got heal "+healnumber+" HP and has now "+this.current_health+"HP."
        } else {
            this.current_health+=healnumber;
            return "The character got heal "+healnumber+" HP and has now "+this.current_health+"HP."
        }
    }

    revive=(healrevive: number): string=> {
        if (this.current_health==0){
            this.current_health=healrevive;
            return "The character is now alive with "+healrevive+"HP."
        } else {
            return "The character is not dead you can't revive it"
        }
    }

    isAlive(): boolean {
        return this.current_health > 0;
    }
}