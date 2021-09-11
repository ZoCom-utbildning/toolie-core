import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';

interface SelfieConfig{
    showPickedName : boolean,
    excludeName: boolean,
    namePicker: string
}

export default class Selfie {

    private pickedNames : Array<object> = [];
    private toBeExcluded : object = {};
    private everyone : Array<object> = [];

    private config : SelfieConfig = {
        showPickedName : false,
        excludeName: false,
        namePicker: 'slotmachine'
    }

    constructor(everyone : Array<object>){
        this.everyone = everyone
    }

    shuffle(roster : Array<string>): Array<object> {
        roster.map(name => {
            return { name: name, id: nanoid(3) }
        })
        this.everyone = shuffle(roster) as Array<Object>
        return this.everyone
    }

    pickName(): object {
        
        if(this.config.excludeName && this.everyone.length) {
            let idx = this.everyone.findIndex(name => name = this.toBeExcluded)
            this.everyone.splice(idx, 1);
        };

        let randomIndex: number = Math.floor(Math.random()*this.everyone.length);
        let pickedMember: object = this.everyone[randomIndex];

        if(this.config.showPickedName) {
            this.pickedNames.push(pickedMember);
        }

        if(this.config.excludeName) {
            this.toBeExcluded = pickedMember;
        };

        return this.everyone[randomIndex];
    }
}