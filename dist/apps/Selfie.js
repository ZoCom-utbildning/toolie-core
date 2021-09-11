import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';
export default class Selfie {
    constructor(everyone) {
        this.pickedNames = [];
        this.toBeExcluded = {};
        this.everyone = [];
        this.config = {
            showPickedName: false,
            excludeName: false,
            namePicker: 'slotmachine'
        };
        this.everyone = everyone;
    }
    shuffle(roster) {
        let newArr = [];
        for (let i = 0; i < roster.length; i++) {
            newArr.push({ name: name, id: nanoid(3) });
        }
        this.everyone = shuffle(newArr);
        return newArr;
    }
    pickName() {
        if (this.config.excludeName && this.everyone.length) {
            let idx = this.everyone.findIndex(name => name = this.toBeExcluded);
            this.everyone.splice(idx, 1);
        }
        ;
        let randomIndex = Math.floor(Math.random() * this.everyone.length);
        let pickedMember = this.everyone[randomIndex];
        if (this.config.showPickedName) {
            this.pickedNames.push(pickedMember);
        }
        if (this.config.excludeName) {
            this.toBeExcluded = pickedMember;
        }
        ;
        return this.everyone[randomIndex];
    }
}
//# sourceMappingURL=Selfie.js.map