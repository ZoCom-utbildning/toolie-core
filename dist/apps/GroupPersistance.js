import { nanoid } from 'nanoid';
const key = 'toolie';
export default class GroupPersistance {
    create(members, name) {
        let storage = localStorage.getItem(key);
        const id = nanoid(5);
        const newGroup = { id: id, name: name, members: members };
        if (storage) {
            let parsedStorage = JSON.parse(storage);
            parsedStorage.push(newGroup);
            localStorage.setItem(key, JSON.stringify(parsedStorage));
        }
        else {
            localStorage.setItem(key, JSON.stringify([newGroup]));
        }
    }
    read() {
        let groups = localStorage.getItem(key);
        if (groups) {
            return JSON.parse(groups);
        }
        else {
            console.log('No groups found in localStorage.');
            return null;
        }
    }
    delete(groupId) {
        let groups = localStorage.getItem(key);
        if (groups) {
            let updatedGroups = JSON.parse(groups);
            updatedGroups = updatedGroups.filter((group) => groupId != group.id);
            localStorage.setItem(key, JSON.stringify(updatedGroups));
        }
    }
}
//# sourceMappingURL=GroupPersistance.js.map