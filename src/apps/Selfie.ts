import { nanoid } from 'nanoid';
import { shuffle } from './../utils/index';

interface SelfieConfig{
    showPickedName : boolean,
    excludeName: boolean,
    namePicker: string
}

interface Person{
    name: string,
    id: string
}

export default class Selfie {

    private pickedNames : Array<string> = [];
    private everyone: Array<Object> = [];
    private toBeExcluded : Object = {};
    private roster : Array<string> = [];

    private config : SelfieConfig = {
        showPickedName : false,
        excludeName: false,
        namePicker: 'slotmachine'
    }

    shuffle(roster : Array<string>){
        roster.map(name => {
            return { name: name, id: nanoid(3) }
        })
        this.everyone = shuffle(roster) as Array<Object>
        return this.everyone
    }

    pickName(): any {
    
        let randomIndex: any = Math.floor(Math.random()*this.everyone.length);
        let pickedMember: any = this.everyone[randomIndex];

        if(this.config.showPickedName) this.pickedNames.push(pickedMember);
        if(this.config.excludeName) this.pickedNames.splice(randomIndex, 1);

        return this.everyone[randomIndex];
    }
}