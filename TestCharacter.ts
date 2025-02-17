import Character from "./Character.ts";

const char1=new Character("andré",10,20,40,50,50);
const char2=new Character("samuel",20,10,30,40,40);
console.log(char1.attack(char2));
console.log(char2.heal(2));

