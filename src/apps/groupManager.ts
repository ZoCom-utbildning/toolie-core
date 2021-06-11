import type { Group } from '../types/index';

const key: string = 'toolie';
let storage: string | null = localStorage.getItem(key);

export default class GroupManager {
    
    constructor() { }

    create(members: String[]) {

    }

    read(): void {

    }

    update(groupId: number, members: String[]){

    }

    delete(groupId: number){

    }
}