import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';
export default class Selfie {
    constructor() {
        this.pickedNames = [];
        this.toBeExcluded = {};
        this.roster = [];
        this.config = {
            showPickedName: false,
            excludeName: false,
            namePicker: 'slotmachine'
        };
    }
    shuffle(roster) {
        roster.map(name => {
            return { name: name, id: nanoid(3) };
        });
        this.roster = shuffle(roster);
        return this.roster;
    }
    pickName() {
        if (this.config.excludeName && this.roster.length) {
            let idx = this.roster.findIndex(name => name = this.toBeExcluded);
            this.roster.splice(idx, 1);
        }
        ;
        let randomIndex = Math.floor(Math.random() * this.roster.length);
        let pickedMember = this.roster[randomIndex];
        if (this.config.showPickedName) {
            this.pickedNames.push(pickedMember);
        }
        if (this.config.excludeName) {
            this.toBeExcluded = pickedMember;
        }
        ;
        return this.roster[randomIndex];
    }
}
//# sourceMappingURL=Selfie.js.map