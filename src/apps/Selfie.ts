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
    private roster : Array<object> = [];

    private config : SelfieConfig = {
        showPickedName : false,
        excludeName: false,
        namePicker: 'slotmachine'
    }

    shuffle(roster : Array<string>){
        roster.map(name => {
            return { name: name, id: nanoid(3) }
        })
        this.roster = shuffle(roster) as Array<Object>
        return this.roster
    }

    pickName(): object {
        
        if(this.config.excludeName && this.roster.length) {
            let idx = this.roster.findIndex(name => name = this.toBeExcluded)
            this.roster.splice(idx, 1);
        };

        let randomIndex: number = Math.floor(Math.random()*this.roster.length);
        let pickedMember: object = this.roster[randomIndex];

        if(this.config.showPickedName) {
            this.pickedNames.push(pickedMember);
        }

        if(this.config.excludeName) {
            this.toBeExcluded = pickedMember;
        };

        return this.roster[randomIndex];
    }
}