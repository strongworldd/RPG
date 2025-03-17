export abstract class Consommable{
    name = ""
    regenLife = 0
    regenMana = 0
    boostSpeed = 0
    boostDamage = 0
    boostDefence = 0

    constructor(name :string, regenLife :number,regenMana :number, boostSpeed :number, boostDamage :number, boostDefence :number){
        this.name = name
        this.regenLife = regenLife
        this.regenMana = regenMana
        this.boostSpeed = boostSpeed
        this.boostDamage = boostDamage
        this.boostDefence = boostDefence
    }
}