import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';
export default class Groupie {
    constructor(everyone) {
        this.groups = [];
        this.everyone = [];
        this.config = {
            enableFunnyNames: true,
            enableLeader: false,
            groupSize: 2
        };
        this.everyone = everyone;
    }
    getEmptyGroups(numGroups) {
        const groups = [];
        for (let i = 0; i < numGroups; i++) {
            groups.push({
                id: nanoid(),
                members: [],
                leaderIndex: -1,
                name: `Group ${groups.length + 1}`,
                pickedMember: ""
            });
        }
        return groups;
    }
    createCrossGroups() {
        const numMembers = this.everyone.length;
        const numGroups = this.groups.length;
        const crossGroups = this.getEmptyGroups(numGroups);
        let crossGroupIndex = 0;
        for (let i = 0; i < numMembers; i++) {
            const groupIndex = i % this.groups.length;
            const group = this.groups[groupIndex];
            const member = group.members.pop();
            const crossGroup = crossGroups[crossGroupIndex];
            if (member) {
                crossGroup.members.push(member);
            }
            if (crossGroup.members.length >= this.config.groupSize) {
                crossGroupIndex++;
                if (crossGroupIndex >= crossGroups.length) {
                    crossGroupIndex = 0;
                }
            }
        }
        crossGroups.forEach((group, i) => group.name = `Tvärgrupp ${i + 1}`);
        this.groups = crossGroups;
    }
    generateNames() {
        if (this.config.enableFunnyNames) {
            const prefixes = shuffle([...Groupie.PREFIXES]);
            const suffixes = shuffle([...Groupie.SUFFIXES]);
            for (const group of this.groups) {
                group.name = `${prefixes.pop()} ${suffixes.pop()}`;
            }
        }
        else {
            for (let i = 0; i < this.groups.length; i++) {
                const group = this.groups[i];
                group.name = `Grupp ${i + 1}`;
            }
        }
    }
    recreateGroups() {
        while (this.groups.length > 0)
            this.groups.pop();
        this.createGroups(this.config);
    }
    createGroups(config) {
        this.config = config;
        const numGroups = Math.floor(this.everyone.length / this.config.groupSize);
        this.everyone = shuffle(this.everyone);
        this.groups = this.getEmptyGroups(numGroups);
        // distribute everyone over groups
        for (let i = 0; i < this.everyone.length; i++) {
            const groupIndex = i % this.groups.length;
            const user = this.everyone[i];
            const group = this.groups[groupIndex];
            group.members.push(user);
        }
        this.generateNames();
        /*
            if(this.config.enableLeader){
              this.groups.forEach(group => group.leaderIndex = group.members.randomIndex() )
            }
        */
    }
}
Groupie.PREFIXES = ["Super", "Ninja", "Bunny", "Robo", "Ultra", "Power", "Speedy", "Crazy", "Bionic", "Space", "Ghost", "Kung-Fu", "Happy", "Smooth", "Fire", "Smart", "Poop", "Mega", "Mad", "Majestic", "Mighty", "Cool", "Diamond", "Fabulous", "Fantastic", "Furious", "Golden", "Silver", "Iron", "Magic", "Ruby", "Pink", "Crypto", "War", "Spicy", "Curly"];
Groupie.SUFFIXES = ["Zebras", "Bananas", "Rabbits", "Zombies", "Rangers", "Sheriffs", "Knights", "Vikings", "Ninjas", "Turtles", "Monkeys", "Pants", "Gardeners", "Guardians", "Masters", "Astronauts", "Experts", "Poopers", "Fighters", "Stars", "Criminals", "Rollers", "Pirates", "Surfers", "Warriors", "Nerds", "Scientists", "Unicorns", "Dolphins", "Kittens"];
//# sourceMappingURL=Groupie.js.map