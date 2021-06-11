import type { Group } from '../types/index';

const key: string = 'toolie';
let storage: string | null = localStorage.getItem(key);

export default class GroupPersistance {

    create(members: Array<String>, name: String) {
        
        const id = (storage) ? JSON.parse(storage).length : 0; // if no groups id = 0
        const newGroup: Group = { id: id, name: name, members: members };
        
        if(storage){
            let parsedStorage: Array<object> = JSON.parse(storage);
            localStorage.setItem(key, JSON.stringify(parsedStorage.push(newGroup)));
        } else {
            localStorage.setItem(key, JSON.stringify([newGroup]));
        }
    }

    read(): Array<Group> | null {

        let groups: string | null = localStorage.getItem(key); 

        if(groups){
            return JSON.parse(groups)
        } else {
            console.log('No groups found in localStorage.')
            return null;
        }
    }

    delete(groupId: number) {

        let groups: string | null = localStorage.getItem(key); 
        
        if(groups){
            let updatedGroups = JSON.parse(groups);
            updatedGroups = updatedGroups.filter((group: Group)  => groupId != group.id );
            localStorage.setItem(key, JSON.stringify(updatedGroups));
        }
    }
}