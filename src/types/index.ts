export declare interface CreatedGroup {
    members: Array<string>,
    leaderIndex: number,
    name: string,
    pickedMember: string
}

export declare interface Group {
    id: number,
    members: String[],
    name: String
}


export enum GroupCreationStrategy {
    BY_AMOUNT,
    BY_GROUP_SIZE
}