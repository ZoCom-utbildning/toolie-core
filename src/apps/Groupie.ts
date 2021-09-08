import type { CreatedGroup, Member } from '../types/index';
import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';

interface GroupieConfig{
  enableFunnyNames : boolean,
  enableLeader: boolean,
  groupSize: number
}

export default class Groupie {
  static PREFIXES = ["Super","Ninja","Bunny","Robo","Ultra","Power","Speedy","Crazy","Bionic","Space","Ghost","Kung-Fu","Happy","Smooth","Fire","Smart","Poop","Mega","Mad","Majestic","Mighty","Cool","Diamond","Fabulous","Fantastic","Furious","Golden","Silver","Iron","Magic","Ruby","Pink","Crypto","War","Spicy","Curly"];
  static SUFFIXES = ["Zebras","Bananas","Rabbits","Zombies","Rangers","Sheriffs","Knights","Vikings","Ninjas","Turtles","Monkeys","Pants","Gardeners","Guardians","Masters","Astronauts","Experts","Poopers","Fighters","Stars","Criminals","Rollers","Pirates","Surfers","Warriors","Nerds","Scientists","Unicorns","Dolphins","Kittens"];

  private groups : Array<CreatedGroup> = []
  private everyone : Array<string> = []
  private config : GroupieConfig = {
    enableFunnyNames: true,
    enableLeader: false,
    groupSize: 2
  }

  constructor(everyone : Array<string>){
    this.everyone = everyone
  }

  getEmptyGroups(numGroups : number) : Array<CreatedGroup>{
    const groups : Array<CreatedGroup> = []
    for(let i = 0; i < numGroups; i++){
      groups.push({
        id: nanoid(),
        members:[], 
        leaderIndex: -1,
        name: `Grupp ${groups.length+1}`,
        pickedMember: ""      
      })
    }
    return groups
  }

  createCrossGroups() : void{
    const numMembers = this.everyone.length
    const numGroups = this.groups.length
    const crossGroups : Array<CreatedGroup> = this.getEmptyGroups(numGroups)
        
    let crossGroupIndex = 0
    for(let i = 0; i < numMembers; i++){
      const groupIndex = i % this.groups.length
      const group = this.groups[groupIndex]      
      
      const member : string | undefined = group.members.pop()
      const crossGroup = crossGroups[crossGroupIndex]
      if(member){
        crossGroup.members.push(member)
      }      
      if(crossGroup.members.length >= this.config.groupSize){
        crossGroupIndex++
        if(crossGroupIndex >= crossGroups.length){
          crossGroupIndex = 0
        }
      }
    }
    crossGroups.forEach((group,i) => group.name = `Tvärgrupp ${i+1}`)
    this.groups = crossGroups
  }

  generateNames() : void{
    if(this.config.enableFunnyNames){
      const prefixes : Array<string> = shuffle([...Groupie.PREFIXES])
      const suffixes : Array<string> = shuffle([...Groupie.SUFFIXES])
      for(const group of this.groups){        
        group.name = `${prefixes.pop()} ${suffixes.pop()}`
      }
    }
    else {
      for(let i = 0; i < this.groups.length; i++){
        const group = this.groups[i]
        group.name = `Grupp ${i+1}`
      }
    }
  }

  recreateGroups() : void{
    while(this.groups.length>0)this.groups.pop()
    this.createGroups(this.config)
  }

  createGroups(config : GroupieConfig) : void {
    this.config = config
    
    const numGroups = Math.floor( this.everyone.length / this.config.groupSize )    

    const shuffled: Array<string> = [...shuffle(this.everyone)];

    // handle separation
    const sorted: Array<string> = [];

    shuffled.forEach(member => {
      if(member.includes('   ')){
        sorted.unshift(member.trim())
      } else {
        sorted.push(member)
      }
    })

    this.everyone = sorted;

    this.groups = this.getEmptyGroups(numGroups)

    // distribute everyone over groups
    for(let i = 0; i < this.everyone.length; i++){
      const groupIndex = i % this.groups.length
      const user = this.everyone[i]
      const group = this.groups[groupIndex]
      
      group.members.push( user )
    }

    this.generateNames()

    this.groups.map(group => shuffle(group.members))

    if(this.config.enableLeader){
      this.groups.forEach(group => group.leaderIndex = Math.floor(Math.random()*group.members.length))
    }
  }
}